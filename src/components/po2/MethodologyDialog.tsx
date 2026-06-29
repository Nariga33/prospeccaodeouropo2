import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export interface Methodology {
  t: string;
  d: string;
  acronym?: string;
  summary: string;
  when: string;
  example: string;
}

interface Props {
  item: Methodology | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function MethodologyDialog({ item, open, onOpenChange }: Props) {
  if (!item) return null;
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[92vh] max-w-xl overflow-y-auto border-gold/20 bg-card text-foreground">
        <DialogHeader>
          <div className="mb-2 inline-flex w-fit items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.25em] text-gold">
            Metodologia aplicada
          </div>
          <DialogTitle className="font-display text-3xl text-foreground md:text-4xl">
            {item.t}
          </DialogTitle>
          {item.acronym && (
            <div className="text-xs font-semibold uppercase tracking-widest text-gold/80">
              {item.acronym}
            </div>
          )}
          <DialogDescription className="text-muted-foreground">{item.d}</DialogDescription>
        </DialogHeader>

        <div className="mt-2 space-y-4 text-sm text-foreground/90">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-gold">
              O que é
            </div>
            <p className="mt-1.5">{item.summary}</p>
          </div>
          <div>
            <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-gold">
              Quando aplicar
            </div>
            <p className="mt-1.5">{item.when}</p>
          </div>
          <div className="rounded-xl border border-gold/20 bg-background/40 p-4">
            <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-gold">
              Exemplo na prática
            </div>
            <p className="mt-1.5 italic text-foreground/80">"{item.example}"</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
