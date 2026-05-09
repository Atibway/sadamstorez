;
import { Product2 } from "@/types";
import { create } from "zustand";

interface PreviewModalStore {
    isOpen: boolean;
    data?: Product2;
    onOpen: (data: Product2) => void;
    onClose: () => void;
}

export const usePreviewModal = create<PreviewModalStore>((set) => ({
    isOpen: false,
    data: undefined,
    onOpen: (data: Product2) => set({data, isOpen: true }),
    onClose: ()=> set({isOpen:false})
}))
