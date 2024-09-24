<script>
  import Navbar from '$/lib/components/home/navbar/Navbar.svelte';
  import '$/app.css';
  import Footer from '$/lib/components/home/footer/Footer.svelte';
</script>

<Navbar />
<slot></slot>
<Footer />

<style>
  :global(img) {
    content-visibility: auto;
  }
</style>
