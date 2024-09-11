<script lang="ts">
	import { page } from '$app/stores';
	let href: string | null = null;
	let className: string | null = '';
    const isActive = $page.route.id?.includes(href || '');
	export { href, className as class };
</script>

<a
	{href}
	role="menuitem"
	class={`menu-list-item min-h-[40px] select-none ${className}`}
    class:active={isActive}
	tabindex="0"
>
	<div class="mr-4 menu-list-item-icon">
		<slot name="icon"></slot>
	</div>
	<div class="menu-list-item-title">
		<slot name="title"></slot>
	</div>
</a>
