export class dndUtil {

    static isDroppedInSamePlace = (destinaitonId, sourceId) => {
        return destinaitonId === sourceId;
    }

    static isDroppedOutOfContext = (destination) => {
        return !destination;
    }

}


