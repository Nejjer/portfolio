import { makeAutoObservable, runInAction } from 'mobx';
import {
  api,
  IPortfolio,
  IPresentation,
  IPublication,
  IWorkExperience,
} from '../api/api.ts';

export class MainStore {
  public portfolio: IPortfolio | null = null;
  public portfolios: IPortfolio[] = [];
  public presentations: IPresentation[] = [];
  public workExps: IWorkExperience[] = [];
  public publications: IPublication[] = [];
  private idOfActivePortfolio: number = 0;
  public isLoading = false;

  constructor() {
    this.update();
    makeAutoObservable(this);
  }

  public async update() {
    this.isLoading = true;
    this.portfolios = await api.getPortfolios();
    runInAction(() => (this.isLoading = false));
  }

  public setActivePortfolio(id: number) {
    this.idOfActivePortfolio = id;
  }

  public getActivePortfolio() {
    return this.portfolios.find(
      (portfolio) => portfolio.id === this.idOfActivePortfolio,
    );
  }
}
