import { createSlice } from '@reduxjs/toolkit'
import { calculatePolicy, saveAccidentPolicy, updateAccidentPolicy, saveCardSafePolicy, updateCardSafePolicy, calculateDvPolicy, savePolicy, updatePolicy } from '../actions/policeActions';
import { maleOptions, options } from '../../constants';
const initialState = {
    preFormData: null,
    calculatePolicy: {
        loading: false,
        data: null,
        error: null
    },
    savedPolicy: {
        loading: false,
        data: null,
        error: null
    },
    updatedPolicy: {
        loading: false,
        data: null,
        error: null
    },
    editPolice: null,
    // From DV Bank
    calculatedPolicy: {
        loading: false,
        data: null,
        error: null
    },
    savedDvPolicy: {
        loading: false,
        data: null,
        error: null,
        success: false
    },
    updatedDvPolicy: {
        loading: false,
        error: null,
        success: false
    },
    holdedPolice: null,
}

export const policeSlice = createSlice({
    name: 'police',
    initialState,
    reducers: {
        saveEditData: (state, action) => {
            state.editPolice = {
                ...action.payload,
                holder: action.payload.holder ? options.filter((item) => Number(item.value) === Number(action.payload.holder))[0] : options[0],
                male: action.payload.male ? maleOptions.filter((item) => Number(item.value) === Number(action.payload.male))[0] : maleOptions[0],
            }
        },
        resetEditData: (state) => {
            state.editPolice = initialState.editPolice;
        },
        passPreFormData: (state, action) => {
            state.preFormData = action.payload
        },
        resetCalculatePolicy: (state) => {
            state.calculatePolicy = {
                loading: false,
                data: null,
                error: null,
            }
        },
        resetSavedData: (state) => {
            state.savedPolicy = initialState.savedPolicy;
        },
        resetUpdatedData: (state) => {
            state.updatedPolicy = initialState.updatedPolicy;
        },
        // From DV Bank
        holdPolice: (state, action) => {
            state.holdedPolice = action.payload;
        },
        resetCalculatedPolicy: (state) => {
            state.calculatedPolicy.loading = false;
            state.calculatedPolicy.data = null;
            state.calculatedPolicy.error = null;
        },
        resetSaveSuccess: (state) => {
            state.savedDvPolicy.success = false;
        },
        resetSavedDVPolicy: (state) => {
            state.savedDvPolicy.loading = false;
            state.savedDvPolicy.data = null;
            state.savedDvPolicy.error = null;
            state.savedDvPolicy.success = false;
        },
        resetUpdateDVPolicy: (state) => {
            state.updatedDvPolicy.loading = false;
            state.updatedDvPolicy.success = false;
            state.updatedDvPolicy.error = null;
        },

    },
    extraReducers: (builder) => {
        //Calculate policy
        builder.addCase(calculatePolicy.pending, (state) => {
            state.calculatePolicy = {
                loading: true,
                data: null,
                error: null,
            }
        })
        builder.addCase(calculatePolicy.fulfilled, (state, action) => {
            state.calculatePolicy = {
                loading: false,
                data: action.payload,
                error: null,
            }
        })
        builder.addCase(calculatePolicy.rejected, (state, action) => {
            state.calculatePolicy = {
                loading: false,
                data: null,
                error: action.payload,
            }
        })
        // Save policy
        builder.addCase(saveAccidentPolicy.pending, (state) => {
            state.savedPolicy = {
                loading: true,
                data: null,
                error: null,
            }
        })
        builder.addCase(saveAccidentPolicy.fulfilled, (state, action) => {
            state.savedPolicy = {
                loading: false,
                data: action.payload,
                error: null,
            }
        })
        builder.addCase(saveAccidentPolicy.rejected, (state, action) => {
            state.savedPolicy = {
                loading: false,
                data: null,
                error: action.payload,
            }
        })
        // Update policy
        builder.addCase(updateAccidentPolicy.pending, (state) => {
            state.updatedPolicy = {
                loading: true,
                data: null,
                error: null,
            }
        })
        builder.addCase(updateAccidentPolicy.fulfilled, (state, action) => {
            state.updatedPolicy = {
                loading: false,
                data: action.payload,
                error: null,
            }
        })
        builder.addCase(updateAccidentPolicy.rejected, (state, action) => {
            state.updatedPolicy = {
                loading: false,
                data: null,
                error: action.payload,
            }
        })

        // Save cardsafe policy
        builder.addCase(saveCardSafePolicy.pending, (state) => {
            state.savedPolicy = {
                loading: true,
                data: null,
                error: null,
            }
        })
        builder.addCase(saveCardSafePolicy.fulfilled, (state, action) => {
            state.savedPolicy = {
                loading: false,
                data: action.payload,
                error: null,
            }
        })
        builder.addCase(saveCardSafePolicy.rejected, (state, action) => {
            state.savedPolicy = {
                loading: false,
                data: null,
                error: action.payload,
            }
        })
        // Update policy
        builder.addCase(updateCardSafePolicy.pending, (state) => {
            state.updatedPolicy = {
                loading: true,
                data: null,
                error: null,
            }
        })
        builder.addCase(updateCardSafePolicy.fulfilled, (state, action) => {
            state.updatedPolicy = {
                loading: false,
                data: action.payload,
                error: null,
            }
        })
        builder.addCase(updateCardSafePolicy.rejected, (state, action) => {
            state.updatedPolicy = {
                loading: false,
                data: null,
                error: action.payload,
            }
        })
        // calculate
        builder.addCase(calculateDvPolicy.pending, (state) => {
            state.calculatedPolicy.loading = true;
            state.calculatedPolicy.error = null;
        })
        builder.addCase(calculateDvPolicy.fulfilled, (state, action) => {
            state.calculatedPolicy.loading = false;
            state.calculatedPolicy.data = action.payload;
            state.calculatedPolicy.error = null;
        })
        builder.addCase(calculateDvPolicy.rejected, (state, action) => {
            state.calculatedPolicy.loading = false;
            state.calculatedPolicy.error = action.payload;
            state.calculatedPolicy.data = null;
        })
        // Create
        builder.addCase(savePolicy.pending, (state) => {
            state.savedDvPolicy.loading = true;
            state.savedDvPolicy.data = null;
            state.savedDvPolicy.error = null;
            state.savedDvPolicy.success = false;
        })
        builder.addCase(savePolicy.fulfilled, (state, action) => {
            state.savedDvPolicy.loading = false;
            state.savedDvPolicy.data = action.payload;
            state.savedDvPolicy.error = null;
            state.savedDvPolicy.success = true;
        })
        builder.addCase(savePolicy.rejected, (state, action) => {
            state.savedDvPolicy.loading = false;
            state.savedDvPolicy.data = null;
            state.savedDvPolicy.error = action.payload;
            state.savedDvPolicy.success = false;
        })
        // Update
        builder.addCase(updatePolicy.pending, (state) => {
            state.updatedDvPolicy.loading = true;
            state.updatedDvPolicy.error = null;
            state.updatedDvPolicy.success = false;
        })
        builder.addCase(updatePolicy.fulfilled, (state, action) => {
            state.updatedDvPolicy.loading = false;
            state.updatedDvPolicy.success = true;
            state.updatedDvPolicy.error = null;
            state.savedDvPolicy.loading = false;
            state.savedDvPolicy.data = action.payload;
            state.savedDvPolicy.error = null;
            state.savedDvPolicy.success = true;
        })
        builder.addCase(updatePolicy.rejected, (state, action) => {
            state.updatedDvPolicy.loading = false;
            state.updatedDvPolicy.error = action.payload;
            state.updatedDvPolicy.success = false;
        })
    },
})

export const { passPreFormData, resetCalculatePolicy, saveEditData, resetEditData, resetSavedData, resetUpdatedData, resetCalculatedPolicy, resetSaveSuccess, resetSavedDVPolicy, resetUpdateDVPolicy, holdPolice } = policeSlice.actions;

export default policeSlice.reducer;