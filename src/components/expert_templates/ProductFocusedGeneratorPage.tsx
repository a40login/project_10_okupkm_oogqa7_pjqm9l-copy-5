import React, { useState }
from 'react';
import { ExpertPageShell } from '@/components/layout/ExpertPageShell';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import type { ExpertPageShellProps } from '@/types/expertPageShell.types';

export interface ProductFocusedGeneratorPageProps extends Omit<
  ExpertPageShellProps,
  | 'onPrimaryAction' // Handled internally to include form data
  | 'children' // Content is defined by this template
  | 'title' // Provided by pageTitle
  | 'description' // Provided by pageDescription
  | 'knowledgeBaseText' // Managed internally by this template
  | 'onKnowledgeBaseTextChange' // Managed internally by this template
  | 'isKnowledgeBaseActive' // Managed internally by this template
  | 'onKnowledgeBaseToggle' // Managed internally by this template
  | 'showKnowledgeBaseToggle' // Always true for this template
> {
  pageTitle: string;
  pageDescription?: React.ReactNode;
  stepIndicator?: { current: number; total: number };
  productSelectLabel: string;
  userProducts: Array<{ value: string; label: string }>;
  onProductChange?: (productId: string | undefined) => void;
  mainInstructionsTextareaLabel: string;
  mainInstructionsTextareaPlaceholder?: string;
  primaryActionLabel: string;
  onGenerate: (data: {
    selectedProductId?: string;
    mainInstructions?: string;
    knowledgeBaseText?: string; // Text from the KB, if active
  }) => Promise<void>;
  savedContentType: string; // For ExpertPageShell
  expertIdentifier: string; // For ExpertPageShell

  // Optional props to control the Knowledge Base from the parent
  initialKnowledgeBaseId?: string; // If a KB is pre-selected (though not directly used by ExpertPageShell, can be for logic)
  knowledgeBaseSectionLabel?: string; // Custom label for the KB section in ExpertPageShell
  // Callback to inform parent about changes in KB state (ID, text, active status)
  onKnowledgeBaseDataChange?: (data: { id?: string; text?: string; isActive: boolean }) => void;
}

export const ProductFocusedGeneratorPage: React.FC<ProductFocusedGeneratorPageProps> = ({
  pageTitle,
  pageDescription,
  stepIndicator,
  productSelectLabel,
  userProducts,
  onProductChange,
  mainInstructionsTextareaLabel,
  mainInstructionsTextareaPlaceholder,
  primaryActionLabel,
  onGenerate,
  savedContentType,
  expertIdentifier,
  initialKnowledgeBaseId, // Used to set initial active state
  knowledgeBaseSectionLabel, // Passed to ExpertPageShell
  onKnowledgeBaseDataChange, // Callback for parent
  isLoading,
  error,
  ...restExpertPageShellProps // Capture other valid ExpertPageShellProps to pass through
}) => {
  const [selectedProductId, setSelectedProductId] = useState<string | undefined>(undefined);
  const [mainInstructions, setMainInstructions] = useState<string>('');

  // Internal state for Knowledge Base text and UI active status
  const [currentKnowledgeBaseText, setCurrentKnowledgeBaseText] = useState<string | undefined>(undefined);
  const [isKbUiActive, setIsKbUiActive] = useState<boolean>(!!initialKnowledgeBaseId);

  const handlePrimaryAction = async () => {
    await onGenerate({
      selectedProductId,
      mainInstructions,
      knowledgeBaseText: isKbUiActive ? currentKnowledgeBaseText : undefined,
    });
  };

  const handleProductChangeInternal = (value: string) => {
    const newProductId = value === 'none' ? undefined : value;
    setSelectedProductId(newProductId);
    if (onProductChange) {
      onProductChange(newProductId);
    }
  };

  // Called when ExpertPageShell's Textarea for KB changes
  const handleKbTextChangeInternal = (text: string) => {
    setCurrentKnowledgeBaseText(text);
    if (onKnowledgeBaseDataChange) {
      onKnowledgeBaseDataChange({
        id: initialKnowledgeBaseId, // Assuming ID is static after init for this template
        text,
        isActive: isKbUiActive,
      });
    }
  };

  // Called when ExpertPageShell's Switch for KB changes
  const handleKbToggleInternal = (isActive: boolean) => {
    setIsKbUiActive(isActive);
    const newText = isActive ? currentKnowledgeBaseText : undefined;
    if (!isActive) {
      setCurrentKnowledgeBaseText(undefined); // Clear text if KB is deactivated
    }
    if (onKnowledgeBaseDataChange) {
      onKnowledgeBaseDataChange({
        id: isActive ? initialKnowledgeBaseId : undefined,
        text: newText,
        isActive,
      });
    }
  };

  return (
    <ExpertPageShell
      title={pageTitle}
      description={pageDescription}
      primaryActionLabel={primaryActionLabel}
      onPrimaryAction={handlePrimaryAction}
      isLoading={isLoading}
      error={error}
      savedContentType={savedContentType}
      expertIdentifier={expertIdentifier}
      // Props for ExpertPageShell's Knowledge Base feature
      showKnowledgeBaseToggle={true} // This template always offers KB
      knowledgeBaseLabel={knowledgeBaseSectionLabel} // Use prop or ExpertPageShell's default
      isKnowledgeBaseActive={isKbUiActive}
      onKnowledgeBaseToggle={handleKbToggleInternal}
      knowledgeBaseText={currentKnowledgeBaseText}
      onKnowledgeBaseTextChange={handleKbTextChangeInternal}
      {...restExpertPageShellProps} // Pass down other relevant props
    >
      <div className="space-y-6">
        {stepIndicator && (
          <p className="text-sm text-muted-foreground">
            Schritt {stepIndicator.current} von {stepIndicator.total}
          </p>
        )}
        <div className="space-y-2">
          <Label htmlFor="product-select">{productSelectLabel}</Label>
          <Select onValueChange={handleProductChangeInternal} value={selectedProductId || ''}>
            <SelectTrigger id="product-select">
              <SelectValue placeholder="Produkt auswählen..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">Keines</SelectItem>
              {userProducts.map((product) => (
                <SelectItem key={product.value} value={product.value}>
                  {product.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="main-instructions">{mainInstructionsTextareaLabel}</Label>
          <Textarea
            id="main-instructions"
            placeholder={mainInstructionsTextareaPlaceholder}
            value={mainInstructions}
            onChange={(e) => setMainInstructions(e.target.value)}
            rows={6}
          />
        </div>
      </div>
    </ExpertPageShell>
  );
};