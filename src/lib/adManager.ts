// Ad Manager to handle multiple ad banners with proper queue and isolation

interface AdConfig {
  key: string;
  format: string;
  height: number;
  width: number;
  params: Record<string, any>;
}

interface AdInstance {
  id: string;
  config: AdConfig;
  container: HTMLElement | null;
  invokeUrl: string;
  loaded: boolean;
}

class AdManager {
  private instances: Map<string, AdInstance> = new Map();
  private loadQueue: string[] = [];
  private isProcessing = false;

  register(
    id: string,
    config: AdConfig,
    invokeUrl: string,
    container: HTMLElement
  ): void {
    this.instances.set(id, {
      id,
      config,
      container,
      invokeUrl,
      loaded: false,
    });
    this.loadQueue.push(id);
    this.processQueue();
  }

  private processQueue(): void {
    if (this.isProcessing || this.loadQueue.length === 0) {
      return;
    }

    this.isProcessing = true;
    const id = this.loadQueue.shift();
    if (!id) {
      this.isProcessing = false;
      return;
    }

    const instance = this.instances.get(id);
    if (!instance || !instance.container) {
      this.isProcessing = false;
      this.processQueue();
      return;
    }

    this.loadAd(instance);
  }

  private loadAd(instance: AdInstance): void {
    // Create an isolated scope for this ad
    const setupScript = document.createElement("script");
    setupScript.textContent = `
      (function() {
        window.atOptions = ${JSON.stringify(instance.config)};
      })();
    `;
    instance.container?.appendChild(setupScript);

    // Load the invoke script after setup is complete
    setTimeout(() => {
      if (!instance.container) return;

      const invokeScript = document.createElement("script");
      invokeScript.src = instance.invokeUrl;
      invokeScript.async = true;
      invokeScript.onload = () => {
        instance.loaded = true;
        this.isProcessing = false;
        this.processQueue();
      };
      invokeScript.onerror = () => {
        console.error(`Failed to load ad: ${instance.id}`);
        this.isProcessing = false;
        this.processQueue();
      };

      instance.container?.appendChild(invokeScript);
    }, 100);
  }

  unregister(id: string): void {
    this.instances.delete(id);
    this.loadQueue = this.loadQueue.filter((qid) => qid !== id);
  }
}

export const adManager = new AdManager();
