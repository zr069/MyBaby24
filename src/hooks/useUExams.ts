'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { UExamRecord, UExamStatus } from '@/lib/types';
import { getUExamRecords, saveUExamRecord } from '@/lib/storage';
import { U_EXAMINATIONS, UExamDefinition } from '@/data/uExaminations';
import { getAgeInDays } from '@/lib/age';

export interface UExamWithStatus extends UExamDefinition {
  status: UExamStatus;
  record?: UExamRecord;
  daysUntilStart: number;
  daysUntilEnd: number;
}

export function useUExams(birthDate: string, birthTime: string) {
  const [records, setRecords] = useState<UExamRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setRecords(getUExamRecords());
    setLoading(false);
  }, []);

  const ageDays = getAgeInDays(birthDate, birthTime);

  const examsWithStatus: UExamWithStatus[] = useMemo(() => {
    return U_EXAMINATIONS.map(exam => {
      const record = records.find(r => r.examKey === exam.key);
      const range = exam.toleranceRange || exam.ageRange;
      const daysUntilStart = range.fromDays - ageDays;
      const daysUntilEnd = range.toDays - ageDays;

      let status: UExamStatus;
      if (record?.status === 'completed') {
        status = 'completed';
      } else if (ageDays > range.toDays) {
        status = 'overdue';
      } else if (ageDays >= exam.ageRange.fromDays && ageDays <= exam.ageRange.toDays) {
        status = 'due';
      } else if (daysUntilStart <= 14 && daysUntilStart > 0) {
        status = 'upcoming';
      } else {
        status = 'not_due';
      }

      return { ...exam, status, record, daysUntilStart, daysUntilEnd };
    });
  }, [records, ageDays]);

  const nextExam = examsWithStatus.find(e => e.status === 'due' || e.status === 'upcoming')
    || examsWithStatus.find(e => e.status === 'not_due');

  const overdueExams = examsWithStatus.filter(e => e.status === 'overdue');

  const saveExam = useCallback((record: UExamRecord) => {
    saveUExamRecord(record);
    setRecords(getUExamRecords());
  }, []);

  return { examsWithStatus, nextExam, overdueExams, loading, saveExam };
}
