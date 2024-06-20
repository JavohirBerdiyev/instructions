import {create} from "zustand";
import {devtools} from "zustand/middleware";

const useStoreProfileSettings = create(
    devtools((set) => ({
        selectedProduct: "",
        currentStep: 0,
        loading: false,
        formData: {
            changeEmail: {
                email:'',
            },
            confirmCode: {
                confirmationCode: '',
            },

        },
        stepStatus: {
            0: { status: 'complete' },
            1: { status: 'complete' },
            2: { status: 'complete' },
        },

        submited: false,
        setSubmited: (payload) => set({ submited: payload }),
        setLoading: (item) => set({loading: item}),
        setCurrentStep: (step) => set({ currentStep: step }),
        setFormData: (payload) => {
            set((state) => ({
                formData: {...state.formData, ...payload},
            }))
        },
        setStepStatus: (payload) => set((state) => ({ stepStatus: { ...state.stepStatus, ...payload } })),

    }))
);

export default useStoreProfileSettings;
