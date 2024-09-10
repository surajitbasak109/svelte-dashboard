<script lang="ts">
	let tabIndex: number | null = -1;
	let className: string | null = '';
	export { tabIndex, className as class };
</script>

<div role="menuitem" class={`menu-list-item min-h-[40px] select-none ${className}`} tabindex={tabIndex}>
	<div class="mr-4 menu-list-item-icon">
		<slot name="icon"></slot>
	</div>
	<div class="menu-list-item-title">
		<slot name="title"></slot>
	</div>
</div>
