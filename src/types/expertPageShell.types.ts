import React from 'react';

export interface ExpertPageShellProps {
  title: string;
  description?: React.ReactNode;
  savedContentType?: string; // z.B. "linkedin-post"
  expertIdentifier?: string; // Eindeutiger Bezeichner des Experten-Tools
  savedContentLinkText?: string; // z.B. "Meine LinkedIn Posts"
  isLoading: boolean;
  error?: string | null;
  children: React.ReactNode; // Hauptinhaltsbereich
  primaryActionLabel: string;
  onPrimaryAction: (knowledgeBaseText?: string) => void;
  secondaryActionLabel?: string;
  onSecondaryAction?: () => void;
  showKnowledgeBaseToggle?: boolean;
  knowledgeBaseLabel?: string;
  knowledgeBaseText?: string;
  onKnowledgeBaseTextChange?: (text: string) => void;
  isKnowledgeBaseActive?: boolean;
  onKnowledgeBaseToggle?: (isActive: boolean) => void;
}