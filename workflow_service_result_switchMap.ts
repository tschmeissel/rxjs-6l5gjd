import { Observable, of, switchMap, tap, catchError } from "rxjs";

interface WorkflowService {
  getWfClientType(): string;
}

const successCb = (wfClientType: string, items: string[]) => {
  console.log("success", wfClientType, items);
};

const result: Observable<{}> = of({});
const contextItems: string[] = ["eins", "zwei", "drei"];

const workflowService: Observable<WorkflowService> = of({
  getWfClientType: () => "web_en"
});

workflowService.pipe(
  switchMap(service =>
    result.pipe(
      tap(() => successCb(service.getWfClientType(), contextItems)),
      catchError(error => {
        console.error("Inner observable error:", error);
        throw error; // oder handle den Fehler auf eine andere Weise
      })
    )
  ),
  catchError(error => {
    console.error("Outer observable error:", error);
    throw error; // oder handle den Fehler auf eine andere Weise
  })
).subscribe(console.log);