'use client'

import { useState } from 'react'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

interface DeleteConfirmModalProps {
  isOpen: boolean
  productName: string
  loading?: boolean
  onConfirm: () => void
  onCancel: () => void
}

export function DeleteConfirmModal({
  isOpen,
  productName,
  loading = false,
  onConfirm,
  onCancel,
}: DeleteConfirmModalProps) {
  const [confirmText, setConfirmText] = useState('')

  if (!isOpen) return null

  const isMatch = confirmText.trim() === productName.trim()

  const handleConfirm = () => {
    if (!isMatch) return
    onConfirm()
  }

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4"
      onClick={onCancel}
    >
      <div
        className="bg-card-bg rounded-card w-full max-w-sm p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onCancel}
          className="absolute top-4 left-4 text-text-muted hover:text-text-dark"
        >
          <X size={18} />
        </button>

        <h2 className="text-lg font-bold text-text-dark mb-2">حذف الصنف</h2>
        <p className="text-sm text-text-muted mb-4">
          هاد الإجراء نهائي وما فيك تراجع عنه. للتأكيد، اكتب اسم الصنف بالأسفل:
          <span className="block font-bold text-text-dark mt-1">{productName}</span>
        </p>

        <Input
          value={confirmText}
          onChange={(e) => setConfirmText(e.target.value)}
          placeholder="اكتب اسم الصنف هون"
          autoFocus
        />

        <div className="flex gap-3 mt-5">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            className="flex-1"
          >
            إلغاء
          </Button>
          <Button
            type="button"
            onClick={handleConfirm}
            disabled={!isMatch || loading}
            loading={loading}
            className="flex-1 bg-red-500! hover:opacity-90!"
          >
            حذف نهائياً
          </Button>
        </div>
      </div>
    </div>
  )
}