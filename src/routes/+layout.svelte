<script>
    import '../app.css';
    import Header from '$lib/components/header/Header.svelte';   
	import Sidebar from '$lib/components/sidebar/Sidebar.svelte';
	import Content from '$/lib/components/content/Content.svelte';
</script>


<Header />
<Sidebar />
<Content>
    <slot></slot>
</Content>
