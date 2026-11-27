import type { ForecastStation } from './types/forecast';

/**
 * Normalizes user or system input to the MAWN file station code.
 * MAWN files in https://mawn.geo.msu.edu/rawdata/legacy/fcsts/nbmnbs/data/
 * follow the pattern: fous16<code-lowercase>.json (e.g. fous16klan.json).
 *
 * This function accepts:
 * - "klan" -> "klan"
 * - "KLAN" -> "klan"
 * - "LAN"  -> "klan" (auto-prepends 'k' for 3-letter FAA/IATA codes)
 * - "fous16klan" -> "klan"
 * - "fous16klan.json" -> "klan"
 */
export function normalizeStationCode(input: string): string {
	let code = input.trim().toLowerCase();
	// strip file extension if present
	if (code.endsWith('.json')) {
		code = code.slice(0, -5);
	}
	// strip fous16 prefix if present
	if (code.startsWith('fous16')) {
		code = code.slice(6);
	}
	// if 3 letters (e.g. 'lan', 'grr'), prepend 'k' for ICAO
	if (code.length === 3 && /^[a-z]{3}$/.test(code)) {
		code = 'k' + code;
	}
	return code;
}

/**
 * Constructs the full MAWN upstream URL for a given station code.
 */
export function getRawDataUrl(stationCode: string): string {
	const code = normalizeStationCode(stationCode);
	return `https://mawn.geo.msu.edu/rawdata/legacy/fcsts/nbmnbs/data/fous16${code}.json`;
}

/**
 * Curated list of Michigan weather stations available in the MAWN NBM/NBS forecast repository.
 */
export const NWS_STATIONS: ForecastStation[] = [
	// Mid-Michigan / Central
	{ code: 'klan', name: 'Lansing (Capital City Airport / MSU)', region: 'Central Michigan' },
	{ code: 'kjxn', name: 'Jackson (Reynolds Field)', region: 'Central Michigan' },
	{ code: 'krnp', name: 'Owosso Community Airport', region: 'Central Michigan' },
	{ code: 'ktew', name: 'Mason (Jewett Field)', region: 'Central Michigan' },
	{ code: 'kmop', name: 'Mount Pleasant Municipal', region: 'Central Michigan' },
	{ code: 'kamn', name: 'Alma (Gratiot Community)', region: 'Central Michigan' },

	// West / Southwest
	{ code: 'kgrr', name: 'Grand Rapids (Gerald R. Ford)', region: 'West Michigan' },
	{ code: 'kbiv', name: 'Holland (Tulip City)', region: 'West Michigan' },
	{ code: 'kmkg', name: 'Muskegon County Airport', region: 'West Michigan' },
	{ code: 'kfpk', name: 'Fremont Municipal', region: 'West Michigan' },
	{ code: 'kazo', name: 'Kalamazoo / Battle Creek', region: 'Southwest Michigan' },
	{ code: 'kbtl', name: 'Battle Creek (W. K. Kellogg)', region: 'Southwest Michigan' },
	{ code: 'kbeh', name: 'Benton Harbor (Southwest Regional)', region: 'Southwest Michigan' },
	{ code: 'klwa', name: 'South Haven Regional', region: 'Southwest Michigan' },
	{ code: 'krmy', name: 'Marshall (Brooks Field)', region: 'Southwest Michigan' },
	{ code: 'koeb', name: 'Coldwater (Branch County)', region: 'Southwest Michigan' },

	// Southeast / Thumb
	{ code: 'kdtw', name: 'Detroit Metro Airport', region: 'Southeast Michigan' },
	{ code: 'karb', name: 'Ann Arbor Municipal', region: 'Southeast Michigan' },
	{ code: 'kdet', name: 'Detroit (Coleman A. Young City)', region: 'Southeast Michigan' },
	{ code: 'kptk', name: 'Pontiac (Oakland County Intl)', region: 'Southeast Michigan' },
	{ code: 'kyip', name: 'Ypsilanti (Willow Run)', region: 'Southeast Michigan' },
	{ code: 'kozw', name: 'Howell (Livingston County)', region: 'Southeast Michigan' },
	{ code: 'kadg', name: 'Adrian (Lenawee County)', region: 'Southeast Michigan' },
	{ code: 'kphn', name: 'Port Huron (St. Clair County)', region: 'The Thumb' },
	{ code: 'kbax', name: 'Bad Axe (Huron County Memorial)', region: 'The Thumb' },
	{ code: 'kcfs', name: 'Caro (Tuscola Area)', region: 'The Thumb' },
	{ code: 'kfnt', name: 'Flint (Bishop International)', region: 'The Thumb / Genesee' },
	{ code: 'kmbs', name: 'Saginaw / Midland / Bay City (MBS)', region: 'Saginaw Valley' },

	// Northern Lower
	{ code: 'ktvc', name: 'Traverse City (Cherry Capital)', region: 'Northern Lower Peninsula' },
	{ code: 'kcad', name: 'Cadillac (Wexford County)', region: 'Northern Lower Peninsula' },
	{ code: 'kmbl', name: 'Manistee (Blacker Airport)', region: 'Northern Lower Peninsula' },
	{ code: 'kldm', name: 'Ludington (Mason County)', region: 'Northern Lower Peninsula' },
	{ code: 'kglr', name: 'Gaylord Regional', region: 'Northern Lower Peninsula' },
	{ code: 'kapn', name: 'Alpena County Regional', region: 'Northern Lower Peninsula' },
	{ code: 'kpln', name: 'Pellston Regional', region: 'Northern Lower Peninsula' },
	{ code: 'kcvx', name: 'Charlevoix Municipal', region: 'Northern Lower Peninsula' },
	{ code: 'kfks', name: 'Frankfort (Dow Memorial)', region: 'Northern Lower Peninsula' },
	{ code: 'khtl', name: 'Houghton Lake (Roscommon County)', region: 'Northern Lower Peninsula' },

	// Upper Peninsula
	{ code: 'ksaw', name: 'Marquette (Sawyer International)', region: 'Upper Peninsula' },
	{ code: 'kesc', name: 'Escanaba (Delta County)', region: 'Upper Peninsula' },
	{ code: 'kcmx', name: 'Hancock / Houghton (Houghton County)', region: 'Upper Peninsula' },
	{ code: 'kanj', name: 'Sault Ste. Marie (Sanderson Field)', region: 'Upper Peninsula' },
	{ code: 'kimt', name: 'Iron Mountain (Ford Airport)', region: 'Upper Peninsula' },
	{ code: 'kiwd', name: 'Ironwood (Gogebic-Iron County)', region: 'Upper Peninsula' },
	{ code: 'kmnm', name: 'Menominee Regional', region: 'Upper Peninsula' },
	{ code: 'kmcd', name: 'Mackinac Island Airport', region: 'Upper Peninsula' }
];

export function findStation(code: string): ForecastStation | undefined {
	const normalized = normalizeStationCode(code);
	return NWS_STATIONS.find((s) => s.code.toLowerCase() === normalized);
}
