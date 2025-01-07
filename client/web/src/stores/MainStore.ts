import { makeAutoObservable } from 'mobx';
import {
  api,
  IConference,
  IEducation,
  IPortfolio,
  IPresentation,
  IPublication,
  IWorkExperience,
} from '../api/api.ts';

export class MainStore {
  public portfolio: IPortfolio | null = null;
  public presentations: IPresentation[] = [];
  public workExps: IWorkExperience[] = [];
  public publications: IPublication[] = [];
  public conferences: IConference[] = [];
  public educations: IEducation[] = [];
  private id = 1;

  constructor() {
    this.update();
    makeAutoObservable(this);
  }

  public async update() {
    try {
      const [
        portfolio,
        presentations,
        workExps,
        publications,
        conferences,
        educations,
      ] = await Promise.all([
        api.getPortfolio(this.id),
        api.getPresentations(this.id),
        api.getWorkExp(this.id),
        api.getPublications(this.id),
        api.getConferences(this.id),
        api.getEducations(this.id),
      ]);

      // Update observables only after all requests are resolved
      this.portfolio = portfolio;
      this.presentations = presentations;
      this.workExps = workExps;
      this.publications = publications;
      this.conferences = conferences;
      this.educations = educations;
    } catch (error) {
      console.error('Failed to update data:', error);
    }
  }

  public getYearsOfWorkExp() {
    try {
      if (this.workExps !== null) {
        const sortedExpt = this.workExps
          .slice()
          .sort((a, b) => parseInt(a.startDate) - parseInt(b.startDate));
        return new Date().getFullYear() - parseInt(sortedExpt[0]?.startDate);
      }
    } catch (error) {
      console.error(error);
    }
    return 5;
  }
}
