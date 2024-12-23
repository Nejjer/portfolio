import { makeAutoObservable, runInAction } from 'mobx';
import {
  api,
  IConference,
  IPortfolioDTO,
  IPostConference,
  IPostPresentation,
  IPostPublication,
  IPostWorkExperience,
  IPresentation,
  IPublication,
  IWorkExperience,
} from '../api/api.ts';
import { ID } from '../api/axiosInstance.ts';

type Loading =
  | 'None'
  | 'SubmitPortfolio'
  | 'MainLoading'
  | 'SubmitWorkExperience'
  | 'SubmitConference'
  | 'SubmitFile'
  | 'UpdateConference'
  | 'UpdatePublication'
  | 'SubmitPublication'
  | 'SubmitPresentation'
  | 'UpdatePresentation';

export class MainStore {
  public portfolio: IPortfolioDTO | null = null;
  public portfolios: IPortfolioDTO[] = [];
  public presentations: IPresentation[] = [];
  public workExps: IWorkExperience[] = [];
  public conferences: IConference[] = [];
  public publications: IPublication[] = [];
  private idOfActivePortfolio: number = -1;
  public isLoading: Loading = 'None';

  constructor() {
    makeAutoObservable(this);

    this.update('MainLoading');
  }

  public async update(loading: Loading): Promise<void> {
    this.setIsLoading(loading);
    this.setPortfolios(await api.getPortfolios());
    this.setIsLoading('None');
  }

  setIsLoading(isLoading: Loading) {
    this.isLoading = isLoading;
  }

  setPortfolios(portfolios: IPortfolioDTO[]) {
    this.portfolios = portfolios;
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

    runInAction(
      // @ts-ignore
      () => (this.workExps = wp.sort((a, b) => a.startDate - b.startDate)),
    );
  }

  public async updateConferences() {
    this.setIsLoading('UpdateConference');
    const wp = await api.getConferences(this.idOfActivePortfolio);

    runInAction(
      // @ts-ignore
      () => (this.conferences = wp.sort((a, b) => a.id - b.id)),
    );
    this.setIsLoading('None');
  }

  public async updatePublications() {
    this.setIsLoading('UpdatePublication');
    const wp = await api.getPublications(this.idOfActivePortfolio);

    runInAction(
      // @ts-ignore
      () => (this.publications = wp.sort((a, b) => a.id - b.id)),
    );
    this.setIsLoading('None');
  }

  public async updatePresentations() {
    this.setIsLoading('UpdatePresentation');
    const wp = await api.getPresentations(this.idOfActivePortfolio);

    runInAction(
      // @ts-ignore
      () => (this.presentations = wp.sort((a, b) => a.id - b.id)),
    );
    this.setIsLoading('None');
  }

  public async submitPortfolio(portfolio: IPortfolioDTO): Promise<void> {
    this.isLoading = 'SubmitPortfolio';
    await api.updatePortfolio(portfolio);
    this.setIsLoading('SubmitPortfolio');
  }

  public async postWorkExperience(
    workExperience: IPostWorkExperience,
  ): Promise<void> {
    this.isLoading = 'SubmitWorkExperience';
    await api.postWorkExperience(workExperience);
    this.setIsLoading('None');
    this.updateWorkExps();
  }

  public async putWorkExperience(
    workExperience: IWorkExperience,
  ): Promise<void> {
    this.isLoading = 'SubmitWorkExperience';
    await api.putWorkExperience(workExperience);
    this.setIsLoading('None');
    this.updateWorkExps();
  }

  public async deleteWorkExperience(id: ID): Promise<void> {
    this.isLoading = 'SubmitWorkExperience';
    await api.deleteWorkExperience(id);
    this.setIsLoading('None');
    this.updateWorkExps();
  }

  /** КОНФЕРЕНЦИИ */
  public async postConference(conference: IPostConference): Promise<void> {
    this.isLoading = 'SubmitConference';
    await api.postConference(conference);
    this.setIsLoading('None');
    this.updateConferences();
  }

  public async putConference(conference: IConference): Promise<void> {
    this.isLoading = 'SubmitConference';
    await api.putConference(conference);
    this.setIsLoading('None');
    this.updateConferences();
  }

  public async deleteConference(id: ID): Promise<void> {
    this.isLoading = 'SubmitConference';
    await api.deleteConference(id);
    this.setIsLoading('None');
    this.updateConferences();
  }

  /** ПУБЛИКАЦИИ */
  public async postPublication(conference: IPostPublication): Promise<void> {
    this.isLoading = 'SubmitPublication';
    await api.postPublication(conference);
    this.setIsLoading('None');
    this.updatePublications();
  }

  public async putPublication(conference: IPublication): Promise<void> {
    this.isLoading = 'SubmitPublication';
    await api.putPublication(conference);
    this.setIsLoading('None');
    this.updatePublications();
  }

  public async deletePublication(id: ID): Promise<void> {
    this.isLoading = 'SubmitPublication';
    await api.deletePublication(id);
    this.setIsLoading('None');
    this.updatePublications();
  }

  /** ПРЕЗЕНТАЦИИ */
  public async postPresentation(
    presentation: IPostPresentation,
  ): Promise<void> {
    this.isLoading = 'SubmitPresentation';
    await api.postPresentation(presentation);
    this.setIsLoading('None');
    this.updatePresentations();
  }

  public async putPresentation(presentation: IPresentation): Promise<void> {
    this.isLoading = 'SubmitPresentation';
    await api.putPresentation(presentation);
    this.setIsLoading('None');
    this.updatePresentations();
  }

  public async deletePresentation(id: ID): Promise<void> {
    this.isLoading = 'SubmitPresentation';
    await api.deletePresentation(id);
    this.setIsLoading('None');
    this.updatePresentations();
  }
}
