import React, { useState, useEffect } from "react";
import { ModalPortal } from "../../../components/modalPortal";
import {
    type GetAllGpsTrackingOutput,
    type GetFormOptionsGpsTrackingOutput,
} from "srf-shared-types";
import {
    getGpsTrackingFormOptions,
    createGpsTracking,
    updateGpsTracking
} from "../../../services/liveanimals/gpsTrackingService";

interface GpsTrackingFormModalProps {
    gpsTracking?: GetAllGpsTrackingOutput;
    close: () => void;
    refresh: () => void;
}

export function GpsTrackingFormModal({ gpsTracking, close, refresh }: GpsTrackingFormModalProps) {
    const isEditing = !!gpsTracking;

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [options, setOptions] = useState<GetFormOptionsGpsTrackingOutput | null>(null);

    // Campos do formulário
    const [liveAnimalId, setLiveAnimalId] = useState<number | ''>(gpsTracking?.liveAnimalId ?? '');
    const [trackingDeviceId, setTrackingDeviceId] = useState<number | ''>(gpsTracking?.trackingDeviceId ?? '');
    const [startDate, setStartDate] = useState<string>(gpsTracking?.startDate ? gpsTracking.startDate.split('T')[0] : '');
    const [endDate, setEndDate] = useState<string>(gpsTracking?.endDate ? gpsTracking.endDate.split('T')[0] : '');
    const [note, setNote] = useState<string>(gpsTracking?.note ?? '');

    // Resultado da Movimentação
    const [monitoredDays, setMonitoredDays] = useState<number | ''>(gpsTracking?.monitoredDays ?? '');
    const [locationPoints, setLocationPoints] = useState<number | ''>(gpsTracking?.locationPoints ?? '');
    const [livingArea, setLivingArea] = useState<number | ''>(gpsTracking?.livingArea ?? '');
    const [monitoringMethodId, setMonitoringMethodId] = useState<number | ''>(gpsTracking?.monitoringMethodId ?? '');

    // Planilhas
    const [rawSpreadsheetLink, setRawSpreadsheetLink] = useState<string>(gpsTracking?.rawSpreadsheetLink ?? '');
    const [rawSpreadsheetUpdateDate, setRawSpreadsheetUpdateDate] = useState<string>(gpsTracking?.rawSpreadsheetUpdateDate ? gpsTracking.rawSpreadsheetUpdateDate.split('T')[0] : '');
    const [editedSpreadsheetLink, setEditedSpreadsheetLink] = useState<string>(gpsTracking?.editedSpreadsheetLink ?? '');
    const [editedSpreadsheetUpdateDate, setEditedSpreadsheetUpdateDate] = useState<string>(gpsTracking?.editedSpreadsheetUpdateDate ? gpsTracking.editedSpreadsheetUpdateDate.split('T')[0] : '');

    useEffect(() => {
        async function loadOptions() {
            try {
                const opts = await getGpsTrackingFormOptions();
                setOptions(opts);
            } catch (error) {
                console.error(error);
            }
        }
        loadOptions();
    }, []);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!liveAnimalId || !trackingDeviceId || !monitoringMethodId) {
            setError('Preencha todos os campos obrigatórios.');
            return;
        }
        setLoading(true);
        setError(null);
        try {
            const data = {
                liveAnimalId: Number(liveAnimalId),
                trackingDeviceId: Number(trackingDeviceId),
                startDate: new Date(startDate + 'T00:00:00').toISOString(),
                endDate: endDate ? new Date(endDate + 'T00:00:00').toISOString() : null,
                note: note || null,
                monitoredDays: Number(monitoredDays),
                locationPoints: Number(locationPoints),
                livingArea: Number(livingArea),
                monitoringMethodId: Number(monitoringMethodId),
                rawSpreadsheetLink: rawSpreadsheetLink || null,
                rawSpreadsheetUpdateDate: rawSpreadsheetUpdateDate ? new Date(rawSpreadsheetUpdateDate + 'T00:00:00').toISOString() : null,
                editedSpreadsheetLink: editedSpreadsheetLink || null,
                editedSpreadsheetUpdateDate: editedSpreadsheetUpdateDate ? new Date(editedSpreadsheetUpdateDate + 'T00:00:00').toISOString() : null,
            };
            if (isEditing && gpsTracking) {
                await updateGpsTracking(gpsTracking.id, data);
            } else {
                await createGpsTracking(data);
            }
            refresh();
            close();
        } catch (error: any) {
            setError(error.response?.data?.error || 'Erro ao salvar.');
        } finally {
            setLoading(false);
        }
    }

    if (!options) {
        return (
            <ModalPortal>
                <div className="flex justify-center items-center fixed top-0 left-0 w-full h-full bg-black/50 z-100">
                    <div className="bg-white rounded-2xl shadow-xl p-10">Carregando opções...</div>
                </div>
            </ModalPortal>
        );
    }

    return (
        <ModalPortal>
            <div onMouseDown={close} className="modal-overlay flex justify-center items-center fixed top-0 left-0 w-full h-full bg-black/50 z-100 overflow-y-auto p-4">
                <div onMouseDown={(e) => e.stopPropagation()} className="modal relative flex flex-col overflow-y-auto bg-white justify-center items-center rounded-2xl shadow-xl px-10 pt-12 pb-6 gap-5 w-260 max-h-[90vh]">
                    <button onClick={() => close()} className="absolute text-text-main hover:text-standard-red font-bold text-xl cursor-pointer leading-none top-3 right-3" title="Fechar">✕</button>
                    <h2 className="absolute top-2 text-2xl text-standard-blue font-bold">
                        {isEditing ? 'Editando Registro' : 'Novo Registro'}
                    </h2>

                    <form onSubmit={handleSubmit} className="w-full flex flex-col overflow-y-auto gap-4 mt-2 flex-1 min-h-0">
                        {/* Detalhes do Registro */}
                        <fieldset className="border border-border rounded p-4">
                            <legend className="text-sm font-bold text-standard-blue px-2">Detalhes do Registro</legend>
                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <div className="flex flex-col">
                                    <label className="text-sm font-bold mb-1 text-left">Código do Animal</label>
                                    <select value={liveAnimalId} onChange={(e) => setLiveAnimalId(e.target.value ? Number(e.target.value) : '')} className="border border-border rounded p-2 bg-white h-10" required>
                                        <option value="">Selecione...</option>
                                        {options.liveAnimals.map(a => (<option key={a.id} value={a.id}>{a.code}</option>))}
                                    </select>
                                </div>
                                <div className="flex flex-col">
                                    <label className="text-sm font-bold mb-1 text-left">Dispositivo de Rastreamento</label>
                                    <select value={trackingDeviceId} onChange={(e) => setTrackingDeviceId(e.target.value ? Number(e.target.value) : '')} className="border border-border rounded p-2 bg-white h-10" required>
                                        <option value="">Selecione...</option>
                                        {options.trackingDevices.map(td => (<option key={td.id} value={td.id}>{td.brand} {td.serialNumber}</option>))}
                                    </select>
                                </div>
                                <div className="flex flex-col">
                                    <label className="text-sm font-bold mb-1 text-left">Data de Instalação</label>
                                    <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="border border-border rounded p-2 bg-white h-10" required />
                                </div>
                                <div className="flex flex-col">
                                    <label className="text-sm font-bold mb-1 text-left">Data de Retirada (Opcional)</label>
                                    <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="border border-border rounded p-2 bg-white h-10" />
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <label className="text-sm font-bold mb-1 text-left">Observações (Opcional)</label>
                                <textarea
                                    value={note}
                                    onChange={(e) => setNote(e.target.value)}
                                    className="border border-border rounded p-2 bg-white resize-none"
                                    rows={3}
                                    placeholder="Digite as observações..."
                                />
                            </div>
                        </fieldset>

                        {/* Resultado da Movimentação */}
                        <fieldset className="border border-border rounded p-4">
                            <legend className="text-sm font-bold text-standard-blue px-2">Resultado da Movimentação</legend>
                            <div className="grid grid-cols-4 gap-4">
                                <div className="flex flex-col">
                                    <label className="text-sm font-bold mb-1 text-left">Nº de Dias Monitorados</label>
                                    <input type="number" step="1" value={monitoredDays} onChange={(e) => setMonitoredDays(e.target.value ? Number(e.target.value) : '')}
                                        className="border border-border rounded p-2 bg-white h-10" placeholder="0" required />
                                </div>
                                <div className="flex flex-col">
                                    <label className="text-sm font-bold mb-1 text-left">Nº de Pontos de Localização</label>
                                    <input type="number" step="1" value={locationPoints} onChange={(e) => setLocationPoints(e.target.value ? Number(e.target.value) : '')}
                                        className="border border-border rounded p-2 bg-white h-10" placeholder="0" required />
                                </div>
                                <div className="flex flex-col">
                                    <label className="text-sm font-bold mb-1 text-left">Área de Vida</label>
                                    <input type="number" step="any" value={livingArea} onChange={(e) => setLivingArea(e.target.value ? Number(e.target.value) : '')}
                                        className="border border-border rounded p-2 bg-white h-10" placeholder="0" required />
                                </div>
                                <div className="flex flex-col">
                                    <label className="text-sm font-bold mb-1 text-left">Método Utilizado</label>
                                    <select value={monitoringMethodId} onChange={(e) => setMonitoringMethodId(e.target.value ? Number(e.target.value) : '')} className="border border-border rounded p-2 bg-white h-10" required>
                                        <option value="">Selecione...</option>
                                        {options.monitoringMethods.map(m => (<option key={m.id} value={m.id}>{m.description}</option>))}
                                    </select>
                                </div>
                            </div>
                        </fieldset>

                        {/* Planilhas */}
                        <fieldset className="border border-border rounded p-4">
                            <legend className="text-sm font-bold text-standard-blue px-2">Planilhas</legend>
                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <div className="flex flex-col">
                                    <label className="text-sm font-bold mb-1 text-left">Planilha Bruta (Opcional)</label>
                                    <input type="url" value={rawSpreadsheetLink} onChange={(e) => setRawSpreadsheetLink(e.target.value)}
                                        className="border border-border rounded p-2 bg-white h-10" placeholder="Digite o link da planilha bruta..." />
                                </div>
                                {/* <div className="flex flex-col">
                                    <label className="text-sm font-bold mb-1 text-left">Última Atualização da Planilha Bruta</label>
                                    <input type="date" value={rawSpreadsheetUpdateDate} onChange={(e) => setRawSpreadsheetUpdateDate(e.target.value)}
                                        className="border border-border rounded p-2 bg-white h-10" />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4"> */}
                                <div className="flex flex-col">
                                    <label className="text-sm font-bold mb-1 text-left">Planilha Editada (Opcional)</label>
                                    <input type="url" value={editedSpreadsheetLink} onChange={(e) => setEditedSpreadsheetLink(e.target.value)}
                                        className="border border-border rounded p-2 bg-white h-10" placeholder="Digite o link da planilha editada..." />
                                </div>
                                {/* <div className="flex flex-col">
                                    <label className="text-sm font-bold mb-1 text-left">Última Atualização da Planilha Editada</label>
                                    <input type="date" value={editedSpreadsheetUpdateDate} onChange={(e) => setEditedSpreadsheetUpdateDate(e.target.value)}
                                        className="border border-border rounded p-2 bg-white h-10" />
                                </div> */}
                            </div>
                        </fieldset>

                        {error && <p className="text-red-500 text-sm">{error}</p>}

                        <div className="flex justify-center items-center gap-5 mt-2">
                            <button type="submit" className="bg-standard-blue text-white text-xl font-bold py-2 px-5 rounded-xl cursor-pointer" disabled={loading}>
                                {loading ? 'Salvando...' : 'Salvar'}
                            </button>
                            <button type="button" onClick={() => close()} className="bg-standard-blue text-white text-xl font-bold py-2 px-5 rounded-xl cursor-pointer">
                                Cancelar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </ModalPortal>
    )
}
