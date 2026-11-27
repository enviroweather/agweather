import { describe, it, expect } from 'vitest';
import { normalizeStationCode, getRawDataUrl, findStation } from './forecast-stations';

describe('NBM Forecast Stations Helper', () => {
	it('normalizes various station code inputs correctly', () => {
		expect(normalizeStationCode('klan')).toBe('klan');
		expect(normalizeStationCode('KLAN')).toBe('klan');
		expect(normalizeStationCode('LAN')).toBe('klan');
		expect(normalizeStationCode('lan')).toBe('klan');
		expect(normalizeStationCode('fous16klan')).toBe('klan');
		expect(normalizeStationCode('fous16klan.json')).toBe('klan');
		expect(normalizeStationCode('kgrr')).toBe('kgrr');
		expect(normalizeStationCode('grr')).toBe('kgrr');
	});

	it('constructs correct upstream MAWN data URLs', () => {
		expect(getRawDataUrl('klan')).toBe(
			'https://mawn.geo.msu.edu/rawdata/legacy/fcsts/nbmnbs/data/fous16klan.json'
		);
		expect(getRawDataUrl('LAN')).toBe(
			'https://mawn.geo.msu.edu/rawdata/legacy/fcsts/nbmnbs/data/fous16klan.json'
		);
	});

	it('finds station metadata from station code', () => {
		const station = findStation('LAN');
		expect(station).toBeDefined();
		expect(station?.code).toBe('klan');
		expect(station?.name).toContain('Lansing');
	});
});
