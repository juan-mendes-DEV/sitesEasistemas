"use client";

/**
 * Controle de quantidade acessível e reutilizável.
 * Cada loja define a aparência via className; o comportamento é único.
 */

import { Minus, Plus } from "lucide-react";

interface QuantityStepperProps {
  value: number;
  /** Máximo permitido (estoque demonstrativo da linha). */
  max: number;
  onChange: (value: number) => void;
  /** Nome do produto usado nos rótulos de acessibilidade. */
  label: string;
  min?: number;
  disabled?: boolean;
  className?: string;
  buttonClassName?: string;
  valueClassName?: string;
}

export function QuantityStepper({
  value,
  max,
  onChange,
  label,
  min = 1,
  disabled = false,
  className = "",
  buttonClassName = "",
  valueClassName = "",
}: QuantityStepperProps) {
  const podeDiminuir = !disabled && value > min;
  const podeAumentar = !disabled && value < max;

  return (
    <div
      role="group"
      aria-label={`Quantidade de ${label}`}
      className={className}
    >
      <button
        type="button"
        onClick={() => onChange(value - 1)}
        disabled={!podeDiminuir}
        aria-label={`Diminuir quantidade de ${label}`}
        className={buttonClassName}
      >
        <Minus className="h-4 w-4" aria-hidden="true" />
      </button>
      <span className={valueClassName} aria-live="polite">
        {value}
      </span>
      <button
        type="button"
        onClick={() => onChange(value + 1)}
        disabled={!podeAumentar}
        aria-label={`Aumentar quantidade de ${label}`}
        className={buttonClassName}
      >
        <Plus className="h-4 w-4" aria-hidden="true" />
      </button>
    </div>
  );
}
