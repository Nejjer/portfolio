import { axiosInstance, ID } from './axiosInstance.ts';

export interface IPortfolio {
  name: string;
  shortInfo: string;
  slogan: string;
  contacts: [
    {
      name: string;
      value: string;
    },
  ];
  id: ID;
}

export interface IPresentation {
  domainEvents: string[];
  id: number;
  link: string;
  title: string;
  event: string;
  presentationDate: string;
  description: string;
  portfolioId: number;
}

export interface IPublication {
  domainEvents: string[];
  id: number;
  title: string;
  publisher: string;
  publicationDate: string;
  description: string;
  portfolioId: number;
}

export interface IWorkExperience {
  domainEvents: string[];
  id: number;
  name: string;
  year: number;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  portfolioId: number;
}

class Api {
  public async getPortfolio(id: ID): Promise<IPortfolio> {
    return (await axiosInstance.get<IPortfolio>(`${id}`)).data;
  }

  public async getPortfolios(): Promise<IPortfolio[]> {
    return (await axiosInstance.get<IPortfolio[]>('Portfolio')).data;
  }

  public async getPresentations(id: ID): Promise<IPresentation[]> {
    return (await axiosInstance.get<IPresentation[]>(`${id}/presentations`))
      .data;
  }

  public async getPublications(id: ID): Promise<IPublication[]> {
    return (await axiosInstance.get<IPublication[]>(`${id}/publications`)).data;
  }

  public async getWorkExp(id: ID): Promise<IWorkExperience[]> {
    return (await axiosInstance.get<IWorkExperience[]>(`${id}/workExperience`))
      .data;
  }
}

export const api = new Api();
