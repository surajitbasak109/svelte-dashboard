<script lang="ts">
  export let href: string = '#';
  export let size: null | 'md' | 'lg' = 'lg';
  export let block: boolean | null = false;
  export let style: 'outline' | 'primary' | 'inverted' | 'muted' | null = 'primary';

  const sizes = { lg: 'px-5 py-2.5', md: 'px-4 py-2' };

  const styles = {
    outline: 'bg-white border-2 border-black hover:bg-gray-100 text-black ',
    primary: 'bg-black text-white hover:bg-gray-800 border-2 border-transparent',
    inverted: 'bg-white text-black border-2 border-transparent',
    muted: 'bg-gray-100 hover:bg-gray-200 border-2 border-transparent'
  };

  const classList = [
    'rounded text-center transition focus-visible:ring-2 ring-offset-2 ring-gray-200',
    block ? 'w-full block' : 'inline-block',
    sizes[size || 'lg'],
    styles[style || 'primary'],
    $$props.class
  ].join(' ');
</script>

<a {href} class={classList}>
  <slot></slot>
</a>
