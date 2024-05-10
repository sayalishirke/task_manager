import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";
import { TaskStatus } from "../tasks.model";
// custom pipes
export class statusValidationPipe implements PipeTransform{
    readonly allowedStatuses =[
        TaskStatus.OPEN,
        TaskStatus.IN_PROGRESS,
        TaskStatus.DONE
    ]

    private isStatusValid(value:any):boolean{
        const idx = this.allowedStatuses.indexOf(value)
        return idx !==-1
    }
    transform(value: any) {
        value = value.toUpperCase()
        if (!this.isStatusValid(value)){
            throw new BadRequestException(`${value} is not valid status`)
        }
        return value
    }
}