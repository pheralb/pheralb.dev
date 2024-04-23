<script>
  import { experienceData } from '@/data/experience';
  import { cn } from '@/utils';
  import { ArrowUpRight, Building2Icon, BuildingIcon } from 'lucide-svelte';
</script>

<section class="flex flex-col space-y-4">
  <div class="flex flex-col space-y-4">
    <h2 class="text-xl font-medium">Experience</h2>
  </div>

  <ol class="relative space-y-6 border-s-2 border-neutral-300 dark:border-neutral-800">
    {#each experienceData as experience}
      <li class="ms-5 mt-1">
        <div
          class={cn(
            'absolute -start-[6.5px] mt-2 h-3 w-3 rounded-full border border-neutral-400 bg-neutral-200 dark:border-neutral-600 dark:bg-neutral-800'
          )}
        ></div>
        <time
          class="mb-2 font-mono text-xs font-normal leading-none text-neutral-600 dark:text-neutral-400"
        >
          {experience.startDate} - {experience.endDate}
        </time>
        <div class="mt-2 flex flex-col space-y-0.5">
          <h3 class="text-lg font-semibold tracking-tight text-gray-900 dark:text-white">
            {experience.role}
          </h3>
          <a
            href={experience.companyUrl}
            target="_blank"
            rel="noopener"
            class="group flex w-max items-center text-pretty text-sm text-neutral-600 transition-colors duration-150 hover:text-black dark:border-neutral-800 dark:text-neutral-400 dark:hover:text-white"
          >
            <span>{experience.company}</span>
            <ArrowUpRight
              class="ml-1 duration-150 group-hover:translate-x-[1.5px]"
              size={12}
              strokeWidth={1.5}
            />
          </a>
        </div>
        <p class="mt-3 text-pretty text-sm dark:text-neutral-400">
          {experience.aboutRole}
        </p>
      </li>
    {/each}
  </ol>
</section>
