export class WeekdayColumnMap {
  static readonly Monday = { 'selectedDayCol': 14, 'startTimeCol': 21, 'endTimeCol': 28 }
  static readonly Tuesday = { 'selectedDayCol': 15, 'startTimeCol': 22, 'endTimeCol': 29 }
  static readonly Wednesday = { 'selectedDayCol': 16, 'startTimeCol': 23, 'endTimeCol': 30 }
  static readonly Thursday = { 'selectedDayCol': 17, 'startTimeCol': 24, 'endTimeCol': 31 }
  static readonly Friday = { 'selectedDayCol': 18, 'startTimeCol': 25, 'endTimeCol': 32 }
  static readonly Saturday = { 'selectedDayCol': 19, 'startTimeCol': 26, 'endTimeCol': 33 }
  static readonly Sunday = { 'selectedDayCol': 20, 'startTimeCol': 27, 'endTimeCol': 34 }
}


export class DayColumnMapping {
  static readonly openMonday1 = { col: 76, recordKey: 'openMon1Time' }
  static readonly closeMonday1 = { col: 77, recordKey: 'closeMon1Time' }
  static readonly openMonday2 = { col: 78, recordKey: 'openMon2Time' }
  static readonly closeMonday2 = { col: 79, recordKey: 'closeMon2Time' }

  static readonly openTuesday1 = { col: 80, recordKey: 'openTue1Time' }
  static readonly closeTuesday1 = { col: 81, recordKey: 'closeTue1Time' }
  static readonly openTuesday2 = { col: 82, recordKey: 'openTue2Time' }
  static readonly closeTuesday2 = { col: 83, recordKey: 'closeTue2Time' }

  static readonly openWednesday1 = { col: 84, recordKey: 'openWed1Col' }
  static readonly closeWednesday1 = { col: 85, recordKey: 'closeWed1Col' }
  static readonly openWednesday2 = { col: 86, recordKey: 'openWed2Col' }
  static readonly closeWednesday2 = { col: 87, recordKey: 'closeWed2Col' }
  static readonly openThursday1 = { col: 88, recordKey: 'openThur1Col' }
  static readonly closeThursday1 = { col: 89, recordKey: 'closeThur1Col' }
  static readonly openThursday2 = { col: 90, recordKey: 'openThur2Col' }
  static readonly closeThursday2 = { col: 91, recordKey: 'closeThur2Col' }
  static readonly openFriday1 = { col: 92, recordKey: 'openFri1Col' }
  static readonly closeFriday1 = { col: 93, recordKey: 'closeFri1Col' }
  static readonly openFriday2 = { col: 94, recordKey: 'openFri2Col' }
  static readonly closeFriday2 = { col: 95, recordKey: 'closeFri2Col' }
  static readonly openSaturday1 = { col: 96, recordKey: 'openSat1Col' }
  static readonly closeSaturday1 = { col: 97, recordKey: 'closeSat1Col' }
  static readonly openSaturday2 = { col: 98, recordKey: 'openSat2Col' }
  static readonly closeSaturday2 = { col: 99, recordKey: 'closeSat2Col' }
  static readonly openSunday1 = { col: 100, recordKey: 'openSun1Col' }
  static readonly closeSunday1 = { col: 101, recordKey: 'closeSun1Col' }
  static readonly openSunday2 = { col: 102, recordKey: 'openSun2Col' }
  static readonly closeSunday2 = { col: 103, recordKey: 'closeSun2Col' }
}

export class DayColumnMappingS4 {
  static readonly openMonday1 = { col: 75, recordKey: 'openMon1Time' }
  static readonly closeMonday1 = { col: 76, recordKey: 'closeMon1Time' }
  static readonly openMonday2 = { col: 77, recordKey: 'openMon2Time' }
  static readonly closeMonday2 = { col: 78, recordKey: 'closeMon2Time' }

  static readonly openTuesday1 = { col: 79, recordKey: 'openTue1Time' }
  static readonly closeTuesday1 = { col: 80, recordKey: 'closeTue1Time' }
  static readonly openTuesday2 = { col: 81, recordKey: 'openTue2Time' }
  static readonly closeTuesday2 = { col: 82, recordKey: 'closeTue2Time' }

  static readonly openWednesday1 = { col: 83, recordKey: 'openWed1Col' }
  static readonly closeWednesday1 = { col: 84, recordKey: 'closeWed1Col' }
  static readonly openWednesday2 = { col: 85, recordKey: 'openWed2Col' }
  static readonly closeWednesday2 = { col: 86, recordKey: 'closeWed2Col' }
  static readonly openThursday1 = { col: 87, recordKey: 'openThur1Col' }
  static readonly closeThursday1 = { col: 88, recordKey: 'closeThur1Col' }
  static readonly openThursday2 = { col: 89, recordKey: 'openThur2Col' }
  static readonly closeThursday2 = { col: 90, recordKey: 'closeThur2Col' }
  static readonly openFriday1 = { col: 91, recordKey: 'openFri1Col' }
  static readonly closeFriday1 = { col: 92, recordKey: 'closeFri1Col' }
  static readonly openFriday2 = { col: 93, recordKey: 'openFri2Col' }
  static readonly closeFriday2 = { col: 94, recordKey: 'closeFri2Col' }
  static readonly openSaturday1 = { col: 95, recordKey: 'openSat1Col' }
  static readonly closeSaturday1 = { col: 96, recordKey: 'closeSat1Col' }
  static readonly openSaturday2 = { col: 97, recordKey: 'openSat2Col' }
  static readonly closeSaturday2 = { col: 98, recordKey: 'closeSat2Col' }
  static readonly openSunday1 = { col: 99, recordKey: 'openSun1Col' }
  static readonly closeSunday1 = { col: 100, recordKey: 'closeSun1Col' }
  static readonly openSunday2 = { col: 101, recordKey: 'openSun2Col' }
  static readonly closeSunday2 = { col: 102, recordKey: 'closeSun2Col' }
}
export type TimeSlotKey = keyof typeof DayColumnMapping | keyof typeof DayColumnMappingS4
