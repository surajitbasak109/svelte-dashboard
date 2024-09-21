<script lang="ts">
  import { sidebar_width } from '$/store/sidebar_status';

  $: sidebar_width_value = $sidebar_width;
</script>

<main
  style={`padding: 70px 0 5px ${sidebar_width_value}px;`}
  class="flex content flex-[1_0_auto] max-w-full transition-[0.2s_cubic-bezier(.4,0,.2,1)]">
  <div class="relative flex-auto max-w-full content-wrap">
    <div id="core-view">
      <div class="application !bg-[#f2f3f8] text-black/[.87] leading-[1.5] flex relative">
        <div class="flex flex-col flex-auto application-wrap min-h-[100vh] max-w-full relative">
          <br />
          <div class="flex flex-wrap justify-center flex-auto m-0">
            <slot></slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</main>
