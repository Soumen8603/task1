import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import companyService from "../api/companyService"; // Make sure this path is correct

const initialState = {
  profile: null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

// --- ALL YOUR THUNKS MUST BE EXPORTED LIKE THIS ---

// Thunk: Get company profile
export const getCompanyProfile = createAsyncThunk(
  "company/getProfile",
  async (_, thunkAPI) => {
    try {
      return await companyService.getProfile(thunkAPI);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Thunk: Create company profile
export const createCompanyProfile = createAsyncThunk(
  "company/createProfile",
  async (profileData, thunkAPI) => {
    try {
      return await companyService.createProfile(profileData, thunkAPI);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Thunk: Update company profile
export const updateCompanyProfile = createAsyncThunk(
  "company/updateProfile",
  async (profileData, thunkAPI) => {
    try {
      return await companyService.updateProfile(profileData, thunkAPI);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Thunk: Upload company logo
export const uploadCompanyLogo = createAsyncThunk(
  "company/uploadLogo",
  async (file, thunkAPI) => {
    try {
      return await companyService.uploadLogo(file, thunkAPI);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Thunk: Upload company banner
export const uploadCompanyBanner = createAsyncThunk(
  "company/uploadBanner",
  async (file, thunkAPI) => {
    try {
      return await companyService.uploadBanner(file, thunkAPI);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// --- YOUR SLICE DEFINITION ---

export const companySlice = createSlice({
  name: "company",
  initialState,
  reducers: {
    resetCompany: (state) => {
      state.profile = null;
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      // GET
      .addCase(getCompanyProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCompanyProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        const data = action.payload ? action.payload.data : null;
        state.profile =
          !data || (typeof data === "object" && Object.keys(data).length === 0)
            ? null
            : data;
      })
      .addCase(getCompanyProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.profile = null;
      })
      // CREATE
      .addCase(createCompanyProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createCompanyProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.profile = action.payload.data;
      })
      .addCase(createCompanyProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // UPDATE
      .addCase(updateCompanyProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.profile = action.payload.data;
      })
      // UPLOAD LOGO
      .addCase(uploadCompanyLogo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.profile = action.payload.data; // always overwrite directly
      })
      // UPLOAD BANNER
      .addCase(uploadCompanyBanner.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.profile = action.payload.data; // always overwrite directly
      });
  },
});

export const { resetCompany } = companySlice.actions;
export default companySlice.reducer;
