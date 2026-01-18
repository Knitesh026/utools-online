"use client";

import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

interface GalleryItem {
  id: string;
  title: string;
  summary: string;
  url: string;
  image: string;
}

interface Gallery6Props {
  heading?: string;
  demoUrl?: string;
  items?: GalleryItem[];
  showDemoLink?: boolean;
}

const Gallery6 = ({
  heading = "Gallery",
  demoUrl = "https://www.shadcnblocks.com",
  items = [
    {
      id: "item-1",
      title: "Build Modern UIs",
      summary:
        "Create stunning user interfaces with our comprehensive design system.",
      url: "#",
      image: "/images/block/placeholder-dark-1.svg",
    },
    {
      id: "item-2",
      title: "Computer Vision Technology",
      summary:
        "Powerful image recognition and processing capabilities that allow AI systems to analyze, understand, and interpret visual information from the world.",
      url: "#",
      image: "/images/block/placeholder-dark-1.svg",
    },
    {
      id: "item-3",
      title: "Machine Learning Automation",
      summary:
        "Self-improving algorithms that learn from data patterns to automate complex tasks and make intelligent decisions with minimal human intervention.",
      url: "#",
      image: "/images/block/placeholder-dark-1.svg",
    },
    {
      id: "item-4",
      title: "Predictive Analytics",
      summary:
        "Advanced forecasting capabilities that analyze historical data to predict future trends and outcomes, helping businesses make data-driven decisions.",
      url: "#",
      image: "/images/block/placeholder-dark-1.svg",
    },
    {
      id: "item-5",
      title: "Neural Network Architecture",
      summary:
        "Sophisticated AI models inspired by human brain structure, capable of solving complex problems through deep learning and pattern recognition.",
      url: "#",
      image: "/images/block/placeholder-dark-1.svg",
    },
  ],
  showDemoLink = false,
}: Gallery6Props) => {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  useEffect(() => {
    if (!carouselApi) {
      return;
    }
    const updateSelection = () => {
      setCanScrollPrev(carouselApi.canScrollPrev());
      setCanScrollNext(carouselApi.canScrollNext());
    };
    updateSelection();
    carouselApi.on("select", updateSelection);
    return () => {
      carouselApi.off("select", updateSelection);
    };
  }, [carouselApi]);
  return (
    <section className="py-2 sm:py-4 md:py-6 lg:py-4">
        <div className="mb-8 flex flex-col justify-between md:mb-14 md:flex-row md:items-end lg:mb-4">
          <div>
            <h2 className="mb-3 text-3xl font-semibold md:mb-4 md:text-4xl lg:mb-6">
              {heading}
            </h2>
            {showDemoLink && (
              <a
                href={demoUrl}
                className="group flex items-center gap-1 text-sm font-medium md:text-base lg:text-lg"
              >
                Book a demo
                <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-1" />
              </a>
            )}
          </div>
        </div>
      <div className="w-full">
        <Carousel
          setApi={setCarouselApi}
          opts={{
            breakpoints: {
              "(max-width: 768px)": {
                dragFree: true,
              },
            },
          }}
          className="relative left-[-1rem]"
        >
          <CarouselContent className="-mr-4 ml-2 2xl:ml-[max(8rem,calc(50vw-700px+1rem))] 2xl:mr-[max(0rem,calc(50vw-700px-1rem))]">
            {items.map((item, index) => {
              const bgColors = [
                "bg-red-100",      // Light peach/salmon
                "bg-pink-100",     // Light pink
                "bg-purple-100",   // Light purple/lavender
                "bg-orange-100",   // Light peach/coral
                "bg-cyan-100",     // Light cyan/turquoise
                "bg-green-100"     // Light green/mint
              ];
              const bgColor = bgColors[index % bgColors.length];
              
              return (
              <CarouselItem key={item.id} className="pl-2 sm:pl-4 md:max-w-[360px]">
                <a
                  href={item.url}
                  className="group flex flex-col justify-between"
                >
                  <div>
                    <div className={`flex aspect-[3/2] overflow-clip rounded-lg sm:rounded-2xl ${bgColor} p-1 sm:p-2`}>
                      <div className="flex-1 rounded-md sm:rounded-xl overflow-hidden">
                        <div className="relative h-full w-full origin-bottom transition duration-300 group-hover:scale-105">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="h-full w-full object-cover object-center rounded-md sm:rounded-lg"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mb-1 sm:mb-2 line-clamp-3 break-words pt-2 sm:pt-4 text-sm sm:text-lg md:text-xl lg:text-2xl font-medium md:mb-3 lg:pt-4">
                    {item.title}
                  </div>
                  <div className="mb-4 sm:mb-8 line-clamp-2 text-xs sm:text-sm text-muted-foreground md:mb-12 md:text-base lg:mb-3">
                    {item.summary}
                  </div>
                  <div className="flex items-center text-xs sm:text-sm">
                    Read more{" "}
                    <ArrowRight className="ml-2 size-4 sm:size-5 transition-transform group-hover:translate-x-1" />
                  </div>
                </a>
              </CarouselItem>
            );
            })}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
};

export { Gallery6 };
