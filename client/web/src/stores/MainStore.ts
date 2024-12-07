import { makeAutoObservable } from 'mobx';
import {
  api,
  IConference,
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
  private id = 1;

  constructor() {
    this.update();
    makeAutoObservable(this);
  }

  public async update() {
    this.portfolio = await api.getPortfolio(this.id);
    this.presentations = await api.getPresentations(this.id);
    this.workExps = await api.getWorkExp(this.id);
    this.publications = await api.getPublications(this.id);
    this.conferences = await api.getConferences(this.id);
  }
}
