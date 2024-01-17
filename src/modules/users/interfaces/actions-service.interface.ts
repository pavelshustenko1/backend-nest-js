import { Container } from '../../containers/types/container.type';
import { ActionDto } from '../dtos/action.dto';

export interface ActionsService {
  putThingInsideContainer(dto: ActionDto): Promise<Container>;
  removeThingFromContainer(dto: ActionDto): Promise<Container>;
}
