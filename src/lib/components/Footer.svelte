<script lang="ts">
    import { base } from '$app/paths';
    import MSUMastHead from '$lib/components/MSUMastHead.svelte'
</script>

<!-- FOOTER: Institutional MSU Footer -->
<footer class="msu-footer pt-12 pb-8 px-4 sm:px-8 mt-auto">
    <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 pb-8 border-b border-emerald-900/60 justify-items-stretch">
        <div>
            <a
                href="https://msu.edu"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-block text-white hover:text-emerald-200 transition-colors mb-4 group"
                aria-label="Michigan State University Homepage (opens in new tab)"
            >
            <MSUMastHead />
            </a>
            <address class="not-italic text-xs sm:text-sm text-slate-100 space-y-1">
                <p class="font-semibold text-white">Michigan Ag Weather and Enviroweather</p>
                <p>Geography Building</p>
                <p>673 Auditorium Road, Room 236</p>
                <p>East Lansing, MI U.S.A. 48824-1115</p>
                <p class="pt-2">
                    <a href="mailto:andresen@msu.edu" class="text-emerald-300 hover:text-white underline"
                        >andresen@msu.edu</a
                    >
                    | (517) 432-6520
                </p>
            </address>
        </div>

        <div>
            <h3 class="text-sm font-bold uppercase tracking-wider text-white mb-3 font-sans">Site Navigation</h3>
            <ul class="text-xs sm:text-sm space-y-2 text-slate-100">
                <li><a href={`${base}/`} class="hover:text-emerald-300 underline-offset-4 hover:underline">Home</a></li>
                <li><a href={`${base}/forecasts/`} class="hover:text-emerald-300 underline-offset-4 hover:underline">Forecast Reports</a></li>
                <li><a href={`${base}/weather/`} class="hover:text-emerald-300 underline-offset-4 hover:underline">Weather Resources</a></li>
                <li><a href={`${base}/articles/`} class="hover:text-emerald-300 underline-offset-4 hover:underline">Articles & News</a></li>
                <li><a href="https://enviroweather.msu.edu" target="_blank" rel="noopener noreferrer" class="hover:text-emerald-300 underline-offset-4 hover:underline">Enviroweather &rarr;</a></li>
            </ul>
        </div>

        <div>
            <h3 class="text-sm font-bold uppercase tracking-wider text-white mb-3 font-sans">Institutional Links</h3>
            <ul class="text-xs sm:text-sm space-y-2 text-slate-100">
                <li>
                    <span>Call MSU: </span>
                    <a href="tel:5173551851" class="text-white font-bold hover:text-emerald-300">(517) 355-1851</a>
                </li>
                <li>
                    <a href="https://msu.edu" target="_blank" rel="noopener noreferrer" class="hover:text-emerald-300 underline-offset-4 hover:underline">Visit msu.edu</a>
                </li>
                <li>
                    <a
                        href="https://civilrights.msu.edu/policies/notice-of-non-discrimination-anti-harassment-and-non-retaliation"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="hover:text-emerald-300 underline-offset-4 hover:underline">Notice of Non-Discrimination</a
                    >
                </li>
                <li>
                    <a href="https://msu.edu/privacy" target="_blank" rel="noopener noreferrer" class="hover:text-emerald-300 underline-offset-4 hover:underline">MSU Privacy Statement</a>
                </li>
                <li>
                    <a href="https://webaccess.msu.edu" target="_blank" rel="noopener noreferrer" class="hover:text-emerald-300 underline-offset-4 hover:underline">Web Accessibility / Accessible MSU</a>
                </li>
            </ul>
        </div>
    </div>

    <div class="max-w-7xl mx-auto pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-3">
        <p>&copy; 2026 Michigan State University Board of Trustees</p>
        <p class="text-slate-400">WCAG 2.2 Compliant • MSU Web Standards</p>
    </div>
</footer>
