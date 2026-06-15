import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { MuscleGroup, ModalConfig } from './types';
import { TRACK_CONSTANTS } from 'src/constants';
import { sessionsApi } from 'src/api/sessions';
import { logsApi } from 'src/api/logs';
import { ApiError } from 'src/api/client';

interface ApiWorkoutSet {
    id: string;
    weight: number;
    reps: number;
    order: number;
}

interface ApiExercise {
    id: string;
    name: string;
    order: number;
    sets: ApiWorkoutSet[];
}

interface ApiMuscleGroup {
    id: string;
    name: string;
    order: number;
    exercises: ApiExercise[];
}

interface ApiWorkoutSession {
    id: string;
    user_id: string;
    workout_date: string;
    muscle_groups: ApiMuscleGroup[];
}

export const useTrackSession = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const isEditParam = searchParams.get('edit') === 'true';

    const [modalConfig, setModalConfig] = useState<ModalConfig | null>(null);
    const [muscleGroups, setMuscleGroups] = useState<MuscleGroup[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [editingSessionId, setEditingSessionId] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!isEditParam) return;

        const loadTodaySession = async () => {
            setIsLoading(true);
            setSubmitError(null);
            try {
                const todayDate = new Date();
                const dateStr = `${todayDate.getFullYear()}-${String(todayDate.getMonth() + 1).padStart(2, '0')}-${String(todayDate.getDate()).padStart(2, '0')}`;
                
                const logsData = await logsApi.getLogsByDate(dateStr);
                const sessionId = logsData?.workout_session?.session_id;
                
                if (sessionId) {
                    setEditingSessionId(sessionId);
                    const sessionData = (await sessionsApi.getSession(sessionId)) as unknown as ApiWorkoutSession;
                    
                    if (sessionData && sessionData.muscle_groups) {
                        const mappedGroups = sessionData.muscle_groups.map((mg: ApiMuscleGroup) => ({
                            id: mg.id,
                            name: mg.name,
                            exercises: mg.exercises.map((ex: ApiExercise) => ({
                                id: ex.id,
                                name: ex.name,
                                sets: ex.sets.map((s: ApiWorkoutSet) => ({
                                    id: s.id,
                                    kg: s.weight.toString(),
                                    reps: s.reps.toString()
                                }))
                            }))
                        }));
                        setMuscleGroups(mappedGroups);
                    }
                } else {
                    setSubmitError("No workout session found for today to edit.");
                }
            } catch (err) {
                console.error('Failed to load today session:', err);
                setSubmitError("Failed to load today's workout session.");
            } finally {
                setIsLoading(false);
            }
        };

        loadTodaySession();
    }, [isEditParam]);

    const handleUpdateMuscleGroup = (mgId: string, name: string) => {
        setMuscleGroups(prev => prev.map(mg => mg.id === mgId ? { ...mg, name } : mg));
    };

    const handleUpdateExercise = (mgId: string, exId: string, name: string) => {
        setMuscleGroups(prev => prev.map(mg => {
            if (mg.id !== mgId) return mg;
            return {
                ...mg,
                exercises: mg.exercises.map(ex => ex.id === exId ? { ...ex, name } : ex)
            };
        }));
    };

    const handleRemoveExercise = (mgId: string, exId: string) => {
        const mg = muscleGroups.find(m => m.id === mgId);
        if (mg && mg.exercises.length === 1) {
            setModalConfig({ type: 'lastExercise', mgId });
        } else {
            setMuscleGroups(prev => prev.map(m => {
                if (m.id !== mgId) return m;
                return {
                    ...m,
                    exercises: m.exercises.filter(ex => ex.id !== exId)
                };
            }));
        }
    };

    const handleAddMuscleGroup = () => {
        setMuscleGroups(prev => [
            {
                id: `mg-${Date.now()}`,
                name: '',
                exercises: [
                    {
                        id: `ex-${Date.now()}`,
                        name: '',
                        sets: [{ id: `set-${Date.now()}`, kg: '', reps: '' }]
                    }
                ]
            },
            ...prev
        ]);
    };

    const handleAddExercise = (mgId: string) => {
        setMuscleGroups(prev => prev.map(mg => {
            if (mg.id !== mgId) return mg;
            return {
                ...mg,
                exercises: [
                    ...mg.exercises,
                    {
                        id: `ex-${Date.now()}`,
                        name: '',
                        sets: [{ id: `set-${Date.now()}`, kg: '', reps: '' }]
                    }
                ]
            };
        }));
    };

    const handleUpdateSet = (mgId: string, exId: string, setId: string, field: 'kg' | 'reps', value: string) => {
        // Prevent negative values
        if (value !== '' && Number(value) < 0) return;

        setMuscleGroups(prev => prev.map(mg => {
            if (mg.id !== mgId) return mg;
            return {
                ...mg,
                exercises: mg.exercises.map(ex => {
                    if (ex.id !== exId) return ex;
                    return {
                        ...ex,
                        sets: ex.sets.map(set => {
                            if (set.id !== setId) return set;
                            return { ...set, [field]: value };
                        })
                    };
                })
            };
        }));
    };

    const handleAddSet = (mgId: string, exId: string) => {
        setMuscleGroups(prev => prev.map(mg => {
            if (mg.id !== mgId) return mg;
            return {
                ...mg,
                exercises: mg.exercises.map(ex => {
                    if (ex.id !== exId) return ex;
                    return {
                        ...ex,
                        sets: [...ex.sets, { id: `set-${Date.now()}`, kg: '', reps: '' }]
                    };
                })
            };
        }));
    };

    const handleRemoveSet = (mgId: string, exId: string, setId: string) => {
        const mg = muscleGroups.find(m => m.id === mgId);
        const ex = mg?.exercises.find(e => e.id === exId);
        if (ex && ex.sets.length === 1) {
            setModalConfig({ type: 'lastSet', mgId, exId });
        } else {
            setMuscleGroups(prev => prev.map(m => {
                if (m.id !== mgId) return m;
                return {
                    ...m,
                    exercises: m.exercises.map(e => {
                        if (e.id !== exId) return e;
                        return {
                            ...e,
                            sets: e.sets.filter(set => set.id !== setId)
                        };
                    })
                };
            }));
        }
    };

    const confirmModalAction = () => {
        if (!modalConfig) return;
        const { type, mgId, exId } = modalConfig;

        if (type === 'muscleGroup' || type === 'lastExercise') {
            setMuscleGroups(prev => prev.filter(mg => mg.id !== mgId));
        } else if (type === 'lastSet') {
            const mg = muscleGroups.find(m => m.id === mgId);
            if (mg && mg.exercises.length === 1) {
                // Deleting the last set deletes the last exercise, which deletes the muscle group
                setMuscleGroups(prev => prev.filter(m => m.id !== mgId));
            } else {
                setMuscleGroups(prev => prev.map(m => {
                    if (m.id !== mgId) return m;
                    return {
                        ...m,
                        exercises: m.exercises.filter(e => e.id !== exId)
                    };
                }));
            }
        }
        setModalConfig(null);
    };

    const getModalText = () => {
        if (!modalConfig) return { title: '', text: '' };
        if (modalConfig.type === 'muscleGroup') return { title: TRACK_CONSTANTS.MODAL_DELETE_TITLE, text: TRACK_CONSTANTS.MODAL_DELETE_TEXT };
        if (modalConfig.type === 'lastExercise') return { title: TRACK_CONSTANTS.MODAL_LAST_EX_TITLE, text: TRACK_CONSTANTS.MODAL_LAST_EX_TEXT };
        return { title: TRACK_CONSTANTS.MODAL_LAST_SET_TITLE, text: TRACK_CONSTANTS.MODAL_LAST_SET_TEXT };
    };


    const getDateHeader = () => {
        const todayDate = new Date();
        const formattedDate = todayDate.toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
        });
        return formattedDate;
    };

    const toIsoDate = (d: Date): string =>
        `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

    const submitSession = async () => {
        for (const mg of muscleGroups) {
            if (!mg.name.trim()) {
                setSubmitError(TRACK_CONSTANTS.ERRORS.NO_MG_NAME);
                return;
            }
            if (!mg.exercises.length) {
                setSubmitError(TRACK_CONSTANTS.ERRORS.NO_EXERCISES(mg.name));
                return;
            }
            for (const ex of mg.exercises) {
                if (!ex.name.trim()) {
                    setSubmitError(TRACK_CONSTANTS.ERRORS.NO_EX_NAME(mg.name));
                    return;
                }
                if (!ex.sets.length) {
                    setSubmitError(TRACK_CONSTANTS.ERRORS.NO_SETS(ex.name));
                    return;
                }
                for (const set of ex.sets) {
                    const weight = parseFloat(set.kg);
                    const reps = parseInt(set.reps, 10);
                    if (isNaN(weight) || weight <= 0) {
                        setSubmitError(TRACK_CONSTANTS.ERRORS.INVALID_WEIGHT(ex.name));
                        return;
                    }
                    if (isNaN(reps) || reps < 1) {
                        setSubmitError(TRACK_CONSTANTS.ERRORS.INVALID_REPS(ex.name));
                        return;
                    }
                }
            }
        }

        setSubmitError(null);
        setIsSubmitting(true);

        const payload = {
            workout_date: toIsoDate(new Date()),
            muscle_groups: muscleGroups.map((mg, mgIdx) => ({
                name: mg.name,
                order: mgIdx + 1,
                exercises: mg.exercises.map((ex, exIdx) => ({
                    name: ex.name,
                    order: exIdx + 1,
                    sets: ex.sets.map((s, sIdx) => ({
                        weight: parseFloat(s.kg) || 0,
                        reps: parseInt(s.reps, 10) || 0,
                        order: sIdx + 1,
                    })),
                })),
            })),
        };

        try {
            if (editingSessionId) {
                await sessionsApi.updateSession(editingSessionId, payload);
            } else {
                await sessionsApi.createSession(payload);
            }
            router.push('/logs');
        } catch (err) {
            if (err instanceof ApiError) {
                setSubmitError(err.message);
            } else {
                setSubmitError('An unexpected error occurred. Please try again.');
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return {
        muscleGroups,
        modalConfig,
        setModalConfig,
        handleUpdateMuscleGroup,
        handleUpdateExercise,
        handleRemoveExercise,
        handleAddMuscleGroup,
        handleAddExercise,
        handleUpdateSet,
        handleAddSet,
        handleRemoveSet,
        confirmModalAction,
        getModalText,
        getDateHeader,
        submitSession,
        isSubmitting,
        submitError,
        isLoading,
        isEdit: !!editingSessionId,
    };
};
