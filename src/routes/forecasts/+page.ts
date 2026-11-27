import type { PageLoad } from './$types';
import { browser } from '$app/environment';
import { NWS_STATIONS, findStation, normalizeStationCode } from '$lib/forecast-stations';

/** Static-safe metadata; query-string station selection is resolved after hydration. */
export const load: PageLoad = ({ url }) => {
	const requestedCode = browser ? url.searchParams.get('station') || 'klan' : 'klan';
	const code = normalizeStationCode(requestedCode);
	const currentStation = findStation(code) ?? {
		code,
		name: requestedCode.toUpperCase(),
		region: 'Other'
	};

	return {
		title: `60-Hour Forecast: ${currentStation.name}`,
		pageTitle: 'Agricultural Weather Office',
		currentStation,
		stations: NWS_STATIONS
	};
};
