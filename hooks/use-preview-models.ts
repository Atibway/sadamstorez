;
import { CartItem } from "@/types";
import { create } from "zustand";

interface PreviewModalStore {
    isOpen: boolean;
    data?: CartItem;
    onOpen: (data: CartItem) => void;
    onClose: () => void;
}

export const usePreviewModal = create<PreviewModalStore>((set) => ({
    isOpen: false,
    data: undefined,
    onOpen: (data: CartItem) => set({data, isOpen: true }),
    onClose: ()=> set({isOpen:false})
}))
