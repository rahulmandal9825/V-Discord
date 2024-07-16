import { Channel, ChannelType, Server } from "@prisma/client";
import {create} from "zustand";

export type ModalType = "createServer" | "invite" | "editServer" | "members" | "CreateChannel" | "leaveServer" | "deleteserver" | "deletechannel" | "editchannel";

interface ModalData {
    server?: Server,
    channelType?: ChannelType,
    channel?: Channel
}
interface ModelStore {
    type: ModalType | null;
    data:ModalData;
    isOpen: boolean;
    onOpen:(type:ModalType , data?:ModalData) => void;
    onClose: () => void;
}

export const useModal = create<ModelStore>((set)=>({
    type: null,
    data:{},
    isOpen: false,
    onOpen:(type, data={}) => set({isOpen: true, type , data}),
    onClose: () => set({type:null , isOpen:false})
}));

