'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { VaccinationRecord, VaccinationStatus } from '@/lib/types';
import { getVaccinationRecords, saveVaccinationRecord } from '@/lib/storage';
import { STIKO_VACCINES, VaccineDefinition, VaccineDose } from '@/data/stikoSchedule';
import { getAgeInDays } from '@/lib/age';
import { v4 as uuidv4 } from 'uuid';

export interface VaccineDoseWithStatus {
  vaccine: VaccineDefinition;
  dose: VaccineDose;
  status: VaccinationStatus;
  record?: VaccinationRecord;
  daysUntilDue: number;
}

export function useVaccinations(birthDate: string, birthTime: string) {
  const [records, setRecords] = useState<VaccinationRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setRecords(getVaccinationRecords());
    setLoading(false);
  }, []);

  const ageDays = getAgeInDays(birthDate, birthTime);

  const allDoses: VaccineDoseWithStatus[] = useMemo(() => {
    const result: VaccineDoseWithStatus[] = [];

    for (const vaccine of STIKO_VACCINES) {
      for (const dose of vaccine.doses) {
        const record = records.find(
          r => r.vaccineKey === vaccine.key && r.doseNumber === dose.doseNumber
        );

        const daysUntilDue = dose.recommendedFromDays - ageDays;

        let status: VaccinationStatus;
        if (record?.status === 'completed') {
          status = 'completed';
        } else if (ageDays > dose.recommendedToDays) {
          status = 'overdue';
        } else if (ageDays >= dose.recommendedFromDays && ageDays <= dose.recommendedToDays) {
          status = 'due';
        } else if (daysUntilDue <= 30 && daysUntilDue > 0) {
          status = 'upcoming';
        } else {
          status = 'not_due';
        }

        result.push({ vaccine, dose, status, record, daysUntilDue });
      }
    }

    return result;
  }, [records, ageDays]);

  const nextDue = allDoses.find(d => d.status === 'due' || d.status === 'upcoming');
  const overdueDoses = allDoses.filter(d => d.status === 'overdue');
  const standardDoses = allDoses.filter(d => d.vaccine.category === 'standard');

  const saveRecord = useCallback((data: Omit<VaccinationRecord, 'id' | 'createdAt' | 'updatedAt'>) => {
    const now = new Date().toISOString();
    const existing = records.find(
      r => r.vaccineKey === data.vaccineKey && r.doseNumber === data.doseNumber
    );
    const record: VaccinationRecord = {
      ...data,
      id: existing?.id || uuidv4(),
      createdAt: existing?.createdAt || now,
      updatedAt: now,
    };
    saveVaccinationRecord(record);
    setRecords(getVaccinationRecords());
  }, [records]);

  return { allDoses, standardDoses, nextDue, overdueDoses, loading, saveRecord };
}
