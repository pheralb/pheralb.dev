<svelte:options css="injected" />

<script lang="ts">
  import { formatDate } from '@/utils';
  import { ClockIcon, SparklesIcon } from 'lucide-svelte';

  let { title, description, date }: { title: string; description: string; date: string } = $props();
</script>

<div class="card">
  <div class="text">
    <h1>{title}</h1>
    <p class="description">{description}</p>
  </div>
  <div class="footer">
    <div class="item">
      <ClockIcon size="16" />
      <p>{formatDate(date)}</p>
    </div>
    <div class="item">
      <SparklesIcon size="16" />
      <p>pheralb.dev</p>
    </div>
  </div>
</div>

<style>
  .card {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    position: relative;
    width: 100%;
    height: 100vh;
    background: #171717;
    font-family: 'Geist-Medium', sans-serif;
    padding: 0;
    box-sizing: border-box;
  }

  .text {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    margin-top: auto;
    margin-bottom: auto;
    padding: 0 70px;
  }

  .text h1 {
    color: #fff;
    font-size: 50px;
    margin-bottom: 0;
  }

  .text .description {
    color: #a3a3a3;
    font-size: 25px;
    margin-bottom: 10px;
  }

  .footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #a3a3a3;
    width: 100%;
    position: absolute;
    bottom: 10;
    left: 0;
    padding: 0 70px;
    box-sizing: border-box;
  }

  .item {
    display: flex;
    align-items: center;
  }

  .item p {
    margin-left: 10px;
  }
</style>
