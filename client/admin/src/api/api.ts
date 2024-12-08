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

export interface IPostWorkExperience {
  startDate: string;
  portfolioId: number;
  description: string;
}

export interface IWorkExperience extends IPostWorkExperience {
  id: number;
}

export interface IPostEducation {
  name: string;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startYear: number;
  endYear: number;
  portfolioId: number;
}

export interface IEducation extends IPostEducation {
  id: number;
}

export interface IPostPublication {
  title: string;
  publisher: string;
  publicationDate: string;
  description: string;
  portfolioId: ID;
}

export interface IPublication extends IPostPublication {
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
    return (
      await axiosInstance.get<IPublication[]>(`publication?portfolioId=${id}`)
    ).data;
  }

  public async getWorkExp(id: ID): Promise<IWorkExperience[]> {
    return (
      await axiosInstance.get<IWorkExperience[]>(
        `workExperience?portfolioId=${id}`,
      )
    ).data;
  }

  public async getEducations(id: ID): Promise<IEducation[]> {
    return (
      await axiosInstance.get<IEducation[]>(`Education?portfolioId=${id}`)
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

  public async postEducation(education: IPostEducation): Promise<void> {
    return await axiosInstance.post('Education', education);
  }

  public async putEducation(education: IEducation): Promise<void> {
    return await axiosInstance.put(`Education/${education.id}`, education);
  }

  public async deleteWorkExperience(id: ID) {
    return await axiosInstance.delete(`WorkExperience/${id}`);
  }

  public async deleteEducation(id: ID) {
    return await axiosInstance.delete(`Education/${id}`);
  }

  public async postPublication(Publication: IPostPublication): Promise<void> {
    return await axiosInstance.post('Publication', Publication);
  }

  public async putPublication(Publication: IPublication): Promise<void> {
    return await axiosInstance.put(
      `Publication/${Publication.id}`,
      Publication,
    );
  }

  public async deletePublication(id: ID): Promise<void> {
    return await axiosInstance.delete(`Publication/${id}`);
  }
}

export const api = new Api();
