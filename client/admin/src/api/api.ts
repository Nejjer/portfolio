import { axiosInstance, ID } from './axiosInstance.ts';

export interface IPortfolioDTO {
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
  credits: string[];
  workExperience: IWorkExperience[];
}

export interface IPortfolio {
  name: string;
  shortInfo: string;
  slogan: string;
  contacts: string[];
  id: ID;
  credits: string;
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

export interface IPostWorkExperience {
  startDate: string;
  portfolioId: number;
  description: string;
}

export interface IWorkExperience extends IPostWorkExperience {
  id: number;
}

class Api {
  public async getPortfolio(id: ID): Promise<IPortfolioDTO> {
    return (await axiosInstance.get<IPortfolioDTO>(`${id}`)).data;
  }

  public async getPortfolios(): Promise<IPortfolioDTO[]> {
    return (await axiosInstance.get<IPortfolioDTO[]>('Portfolio')).data;
  }

  public async getPresentations(id: ID): Promise<IPresentation[]> {
    return (await axiosInstance.get<IPresentation[]>(`${id}/presentations`))
      .data;
  }

  public async getPublications(id: ID): Promise<IPublication[]> {
    return (await axiosInstance.get<IPublication[]>(`${id}/publications`)).data;
  }

  public async getWorkExp(id: ID): Promise<IWorkExperience[]> {
    return (
      await axiosInstance.get<IWorkExperience[]>(
        `workExperience?portfolioId=${id}`,
      )
    ).data;
  }

  public async updatePortfolio(portfolio: IPortfolioDTO): Promise<void> {
    return (await axiosInstance.put(`Portfolio/${portfolio.id}`, portfolio))
      .data;
  }

  public async postWorkExperience(
    workExperience: IPostWorkExperience,
  ): Promise<void> {
    return await axiosInstance.post('WorkExperience', workExperience);
  }

  public async putWorkExperience(
    workExperience: IWorkExperience,
  ): Promise<void> {
    return await axiosInstance.put(
      `WorkExperience/${workExperience.id}`,
      workExperience,
    );
  }
}

export const api = new Api();
