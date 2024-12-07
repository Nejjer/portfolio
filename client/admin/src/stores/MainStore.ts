import { makeAutoObservable, runInAction } from 'mobx';
import {
  api,
  IPortfolioDTO,
  IPostWorkExperience,
  IPresentation,
  IPublication,
  IWorkExperience,
} from '../api/api.ts';

type Loading =
  | 'None'
  | 'SubmitPortfolio'
  | 'MainLoading'
  | 'SubmitWorkExperience';

export class MainStore {
  public portfolio: IPortfolioDTO | null = null;
  public portfolios: IPortfolioDTO[] = [];
  public presentations: IPresentation[] = [];
  public workExps: IWorkExperience[] = [];
  public publications: IPublication[] = [];
  private idOfActivePortfolio: number = -1;
  public isLoading: Loading = 'None';

  constructor() {
    this.update('MainLoading');
    makeAutoObservable(this);
  }

  public async update(loading: Loading): Promise<void> {
    this.isLoading = loading;
    this.portfolios = await api.getPortfolios();
    runInAction(() => (this.isLoading = 'None'));
  }

  public setActivePortfolio(id: number) {
    this.idOfActivePortfolio = id;
  }

  public getActivePortfolio() {
    return this.portfolios.find(
      (portfolio) => portfolio.id === this.idOfActivePortfolio,
    );
  }

  public async updateWorkExps() {
    const wp = await api.getWorkExp(this.idOfActivePortfolio);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    this.workExps = wp.sort((a, b) => a.startDate - b.startDate);
  }

  public async submitPortfolio(portfolio: IPortfolioDTO): Promise<void> {
    this.isLoading = 'SubmitPortfolio';
    await api.updatePortfolio(portfolio);
    runInAction(() => {
      this.update('SubmitPortfolio');
    });
  }

  public async postWorkExperience(
    workExperience: IPostWorkExperience,
  ): Promise<void> {
    this.isLoading = 'SubmitWorkExperience';
    await api.postWorkExperience(workExperience);
    runInAction(() => {
      this.update('SubmitPortfolio');
    });
    this.updateWorkExps();
  }

  public async putWorkExperience(
    workExperience: IWorkExperience,
  ): Promise<void> {
    this.isLoading = 'SubmitWorkExperience';
    await api.putWorkExperience(workExperience);
    runInAction(() => {
      this.update('SubmitPortfolio');
    });
    this.updateWorkExps();
  }
}
