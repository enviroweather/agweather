<script lang="ts">
	import { page } from '$app/state';
	import { base } from '$app/paths';

	interface NavItem {
		href: string;
		label: string;
	}

	const navItems: NavItem[] = [
		{ href: '/', label: 'Home' },
		{ href: '/forecasts/', label: 'Forecasts' },
		{ href: '/weather/', label: 'Weather Resources' },
		{ href: '/articles/', label: 'Articles' }
	];

	function isActive(href: string): boolean {
		const path = `${base}${href}`;
		if (href === '/') return page.url.pathname === path;
		return page.url.pathname.startsWith(path);
	}
</script>

<!-- Desktop Navigation Bar (>= md) -->
<nav aria-label="Desktop Navigation" class="hidden md:block mt-3 pt-3 border-t border-slate-200">
	<ul class="flex items-center gap-1 sm:gap-2 text-sm font-semibold text-slate-700">
		{#each navItems as item (item.href)}
			<li>
				<a
					href={`${base}${item.href}`}
					class="px-3 py-1.5 rounded-md transition-colors {isActive(item.href)
						? 'bg-emerald-50 text-msu-green border-b-2 border-msu-green font-bold'
						: 'hover:bg-slate-100 hover:text-msu-green'}"
					aria-current={isActive(item.href) ? 'page' : undefined}
				>
					{item.label}
				</a>
			</li>
		{/each}
	</ul>
</nav>

<!-- Collapsible Mobile Navigation Drawer (< md) -->
<nav id="lab-nav-menu" aria-label="Mobile Navigation" class="hidden md:hidden mt-3 pt-3 border-t border-slate-200">
	<ul class="menu bg-slate-50 border border-slate-200 rounded-lg p-2 font-semibold text-sm text-slate-700 shadow-sm space-y-1">
		{#each navItems as item (item.href)}
			<li>
				<a
					href={`${base}${item.href}`}
					class="rounded-md transition-colors {isActive(item.href)
						? 'bg-emerald-50 text-msu-green font-bold'
						: 'hover:bg-slate-100 hover:text-msu-green'}"
					aria-current={isActive(item.href) ? 'page' : undefined}
				>
					{item.label}
				</a>
			</li>
		{/each}
	</ul>
</nav>
