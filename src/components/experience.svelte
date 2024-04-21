<script>
  import { experienceData } from '@/data/experience';
  import { ArrowUpRight } from 'lucide-svelte';
</script>

<section class="flex flex-col space-y-4">
  <div class="flex flex-col space-y-4">
    <h2 class="text-xl font-medium">Experience</h2>
  </div>
  {#each experienceData as experience}
    <div class="w-full rounded-md border border-neutral-300 p-3 dark:border-neutral-800">
      <div class="flex items-center space-x-3">
        <div class="flex flex-col space-y-1 w-full">
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-medium">{experience.role}</h3>
            <p class="font-mono text-sm text-neutral-500 dark:text-neutral-400">
              {experience.startDate} - {experience.endDate}
            </p>
          </div>
          <a href="google.com" class="flex items-center space-x-1 w-auto">
            <span class="text-sm text-neutral-500 dark:text-neutral-400">{experience.company}</span>
            <ArrowUpRight size="14" strokeWidth="1.5" />
          </a>
        </div>
      </div>
      <p class="mt-3 text-sm text-neutral-500 dark:text-neutral-400">
        {experience.aboutRole}
      </p>
    </div>
  {/each}
</section>
