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

interface IUploadFile {
  url: string;
}

export interface IPortfolio {
  name: string;
  shortInfo: string;
  slogan: string;
  contacts: string[];
  id: ID;
  credits: string;
}

export interface IPostConference {
  name: string;
  date: string;
  portfolioId: number;
  image: string;
}

export interface IConference extends IPostConference {
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
  portfolioId: number;
}

export interface IPublication extends IPostPublication {
  id: number;
}

export interface IPostPresentation {
  link: string;
  title: string;
  description: string;
  portfolioId: number;
  image: string;
}

export interface IPresentation extends IPostPresentation {
  id: number;
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

  public async uploadFile(formData: FormData) {
    return (
      await axiosInstance.post<IUploadFile>('/Files/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
    ).data;
  }

  public async getConferences(id: ID): Promise<IConference[]> {
    return (
      await axiosInstance.get<IConference[]>(`Conference?portfolioId=${id}`)
    ).data;
  }

  public async getPublications(id: ID): Promise<IPublication[]> {
    return (
      await axiosInstance.get<IPublication[]>(`publication?portfolioId=${id}`)
    ).data;
  }

  public async getPresentations(id: ID): Promise<IPresentation[]> {
    return (
      await axiosInstance.get<IPresentation[]>(`presentation?portfolioId=${id}`)
    ).data;
  }

  public async getEducations(id: ID): Promise<IEducation[]> {
    return (
      await axiosInstance.get<IEducation[]>(`education?portfolioId=${id}`)
    ).data;
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

  public async createPortfolio(portfolio: IPortfolioDTO): Promise<void> {
    return (await axiosInstance.post(`Portfolio`, portfolio)).data;
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

  public async deleteWorkExperience(id: ID) {
    return await axiosInstance.delete(`WorkExperience/${id}`);
  }

  public async postConference(conference: IPostConference): Promise<void> {
    return await axiosInstance.post('Conference', conference);
  }

  public async putConference(conference: IConference): Promise<void> {
    return await axiosInstance.put(`Conference/${conference.id}`, conference);
  }

  public async deleteConference(id: ID) {
    return await axiosInstance.delete(`Conference/${id}`);
  }

  public async postPublication(publication: IPostPublication): Promise<void> {
    return await axiosInstance.post('Publication', publication);
  }

  public async putPublication(publication: IPublication): Promise<void> {
    return await axiosInstance.put(
      `Publication/${publication.id}`,
      publication,
    );
  }

  public async deletePublication(id: ID) {
    return await axiosInstance.delete(`Publication/${id}`);
  }

  public async postPresentation(
    presentation: IPostPresentation,
  ): Promise<void> {
    return await axiosInstance.post('Presentation', presentation);
  }

  public async putPresentation(presentation: IPresentation): Promise<void> {
    return await axiosInstance.put(
      `Presentation/${presentation.id}`,
      presentation,
    );
  }

  public async deletePresentation(id: ID) {
    return await axiosInstance.delete(`Presentation/${id}`);
  }

  public async postEducation(education: IPostEducation): Promise<void> {
    return await axiosInstance.post('Education', education);
  }

  public async putEducation(education: IEducation): Promise<void> {
    return await axiosInstance.put(`Education/${education.id}`, education);
  }

  public async deleteEducation(id: ID) {
    return await axiosInstance.delete(`Education/${id}`);
  }
}

export const api = new Api();
