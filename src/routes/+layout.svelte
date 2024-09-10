<script>
    import '../app.css';
    import Header from '$lib/components/header/Header.svelte';   
	import Sidebar from '$lib/components/sidebar/Sidebar.svelte';
</script>


<Header />
<Sidebar />
<slot></slot>
