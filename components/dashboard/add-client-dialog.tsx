import { useState } from 'react';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { supabase, isSupabaseConfigured } from '@/lib/supabase/client';
import { type ClientOnboarding, type ClientOnboardingInsert, INITIAL_MOCK_CLIENTS } from '@/types/database';

interface AddClientDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onClientAdded: (client: ClientOnboarding) => void;
}

export default function AddClientDialog({ open, onOpenChange, onClientAdded }: AddClientDialogProps) {
  const [form, setForm] = useState<Partial<ClientOnboardingInsert>>({
    client_name: '',
    company_name: '',
    email: '',
    service_tier: 'Basic',
    status: 'Lead',
    priority: 'Low',
    assigned_to: '',
    target_launch_date: undefined,
    notes: '',
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (field: keyof ClientOnboardingInsert) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const newClient: ClientOnboardingInsert = {
      ...form,
    } as ClientOnboardingInsert;

    try {
      let inserted: ClientOnboarding;
      if (isSupabaseConfigured) {
        const { data, error } = await supabase
          .from('client_onboardings')
          .insert([newClient])
          .select('*')
          .single();
        if (error) throw error;
        inserted = data as ClientOnboarding;
      } else {
        // Local mock – generate an ID & timestamp
        const id = crypto.randomUUID();
        const created_at = new Date().toISOString();
        inserted = {
          id,
          created_at,
          ...newClient,
          // Ensure fields are not undefined
          assigned_to: newClient.assigned_to ?? null,
          target_launch_date: newClient.target_launch_date ?? null,
          notes: newClient.notes ?? null,
        } as ClientOnboarding;
        // Add to in‑memory mock array (won't persist after reload)
        INITIAL_MOCK_CLIENTS.push(inserted);
      }
      toast.success('Client added successfully');
      onClientAdded(inserted);
      onOpenChange(false);
    } catch (err) {
      console.error(err);
      toast.error('Failed to add client');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        {/* This trigger is rendered by the parent – keep it empty */}
        <span />
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Add New Client</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            <div>
              <Label htmlFor="client_name">Client Name</Label>
              <Input
                id="client_name"
                required
                value={form.client_name || ''}
                onChange={handleChange('client_name')}
              />
            </div>
            <div>
              <Label htmlFor="company_name">Company</Label>
              <Input
                id="company_name"
                required
                value={form.company_name || ''}
                onChange={handleChange('company_name')}
              />
            </div>
            <div className="sm:col-span-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                required
                value={form.email || ''}
                onChange={handleChange('email')}
              />
            </div>
            <div>
              <Label htmlFor="service_tier">Service Tier</Label>
              <Select
                value={form.service_tier ?? 'Basic'}
                onValueChange={(v) => setForm((p) => ({ ...p, service_tier: v as any }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select tier" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Basic">Basic</SelectItem>
                  <SelectItem value="Pro">Pro</SelectItem>
                  <SelectItem value="Enterprise">Enterprise</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="priority">Priority</Label>
              <Select
                value={form.priority ?? 'Low'}
                onValueChange={(v) => setForm((p) => ({ ...p, priority: v as any }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Low">Low</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                  <SelectItem value="Urgent">Urgent</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="assigned_to">Assigned To</Label>
              <Input
                id="assigned_to"
                value={form.assigned_to || ''}
                onChange={handleChange('assigned_to')}
              />
            </div>
            <div>
              <Label htmlFor="target_launch_date">Target Launch Date</Label>
              <Input
                id="target_launch_date"
                type="date"
                value={form.target_launch_date || ''}
                onChange={handleChange('target_launch_date')}
              />
            </div>
            <div className="sm:col-span-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                rows={3}
                value={form.notes || ''}
                onChange={handleChange('notes')}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={submitting}>
              Cancel
            </Button>
            <Button type="submit" disabled={submitting}>
              {submitting ? 'Adding…' : 'Add Client'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
