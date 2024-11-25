import { ToastStore } from './ToastStore.ts';
import { MainStore } from './MainStore.ts';

export interface AppStore {
  toastStore: ToastStore;
  mainStore: MainStore;
}

const toastStore = new ToastStore();

export const createAppStore = (): AppStore => ({
  toastStore: toastStore,
  mainStore: new MainStore(),
});
