import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_BASE_URL } from "../../config";

export interface IResult {
	code: string;
	short_link: string;
	full_short_link: string;
	short_link2: string;
	full_short_link2: string;
	share_link: string;
	full_share_link: string;
	original_link: string;
}
interface IMyData {
	ok: boolean;
	result: IResult;
}

interface IInitialState {
	items: IResult[];
	loading: string;
}
export const createShortLinks = createAsyncThunk(
	"links/createShortLink",
	async (url: string) => {
		const response = await fetch(API_BASE_URL + url, { method: "POST" });

		return (await response.json()) as IMyData;
	}
);

const initialState = {
	items: [],
	loading: "idle",
} as IInitialState;

const linkSlice = createSlice({
	name: "links",
	initialState,
	reducers: {},
	extraReducers: {
		[createShortLinks.rejected as string | any]: (state: IInitialState) => {
			state.loading = "rejected" as string;
		},
		[createShortLinks.pending as string | any]: (state: IInitialState) => {
			state.loading = "loading";
		},
		[createShortLinks.fulfilled as string | any]: (
			state: IInitialState,
			action
		) => {
			const { ok, result } = action.payload;

			if (ok) {
				state.items.push(result);
				state.loading = "idle";
			} else {
				state.loading = "error";
			}
		},
	},
});

export const selectLoading = (state: any) => state.links.loading;
export const selectLinks = (state: any) => state.links.items;
export default linkSlice.reducer;
