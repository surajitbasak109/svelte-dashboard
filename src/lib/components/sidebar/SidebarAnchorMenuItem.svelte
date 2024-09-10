<script lang="ts">
	let hrefLink: string | null = null;
    let isActive: boolean | null = false;
    let className: string | null = "";
	export { hrefLink as href, isActive, className as class };
</script>

<a href="{hrefLink}" role="menuitem" class="{`menu-list-item min-h-[40px] select-none${isActive ? ' active' : ''} ${className}`}" tabindex="0">
    <div class="mr-4 menu-list-item-icon">
        <slot name="icon"></slot>
    </div>
    <div class="menu-list-item-title">
        <slot name="title"></slot>
    </div>
</a>
