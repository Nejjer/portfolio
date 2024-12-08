import { makeAutoObservable, runInAction } from 'mobx';
import {
  api,
  IEducation,
  IPortfolioDTO,
  IPostEducation,
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
  | 'SubmitEducation'
  | 'SubmitPublication';

export class MainStore {
  public portfolio: IPortfolioDTO | null = null;
  public portfolios: IPortfolioDTO[] = [];
  public presentations: IPresentation[] = [];
  public workExps: IWorkExperience[] = [];
  public publications: IPublication[] = [];
  public educations: IEducation[] = [];
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

    runInAction(
      // @ts-ignore
      () => (this.workExps = wp.sort((a, b) => a.startDate - b.startDate)),
    );
  }

  public async updateEducation() {
    const ed = await api.getEducations(this.idOfActivePortfolio);

    runInAction(
      // @ts-ignore
      () => (this.educations = ed.sort((a, b) => a.startDate - b.startDate)),
    );
  }

  public async updatePublications(): Promise<void> {
    const publications = await api.getPublications(this.idOfActivePortfolio);

    runInAction(
      () =>
        (this.publications = publications.sort(
          // @ts-ignore
          (a, b) => a.publicationDate - b.publicationDate,
        )),
    );
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
      this.update('SubmitWorkExperience');
    });
    this.updateWorkExps();
  }

  public async putWorkExperience(
    workExperience: IWorkExperience,
  ): Promise<void> {
    this.isLoading = 'SubmitWorkExperience';
    await api.putWorkExperience(workExperience);
    runInAction(() => {
      this.update('SubmitWorkExperience');
    });
    this.updateWorkExps();
  }

  public async postEducation(education: IPostEducation): Promise<void> {
    this.isLoading = 'SubmitEducation';
    await api.postEducation(education);
    runInAction(() => {
      this.update('SubmitEducation');
    });
    this.updateEducation();
  }

  public async putEducation(education: IEducation): Promise<void> {
    this.isLoading = 'SubmitEducation';
    await api.putEducation(education);
    runInAction(() => {
      this.update('SubmitEducation');
    });
    this.updateEducation();
  }

  public async deleteWorkExperience(id: ID): Promise<void> {
    this.isLoading = 'SubmitWorkExperience';
    await api.deleteWorkExperience(id);
    runInAction(() => {
      this.update('SubmitWorkExperience');
    });
    this.updateWorkExps();
  }

  public async deleteEducation(id: ID): Promise<void> {
    this.isLoading = 'SubmitEducation';
    await api.deleteEducation(id);
    runInAction(() => {
      this.update('SubmitEducation');
    });
    this.updateEducation();
  }

  public async postPublication(publication: IPostPublication): Promise<void> {
    this.isLoading = 'SubmitPublication';
    await api.postPublication(publication);
    runInAction(() => {
      this.update('SubmitPublication');
    });
    this.updatePublications();
  }

  public async putPublication(publication: IPublication): Promise<void> {
    this.isLoading = 'SubmitPublication';
    await api.putPublication(publication);
    runInAction(() => {
      this.update('SubmitPublication');
    });
    this.updatePublications();
  }

  public async deletePublication(id: ID): Promise<void> {
    this.isLoading = 'SubmitPublication';
    await api.deletePublication(id);
    runInAction(() => {
      this.update('SubmitPublication');
    });
    this.updatePublications();
  }
}
