#!/bin/sh
echo "============================= MANUALLY RESTART NODE PROCESS =============================" >> ./worker.log
supervisorctl stop selfjob-front:*
nodeproc=`netstat -pln | grep :8002 | awk '{print $7}' | cut -d "/" -f 1`
echo "kill du process $nodeproc"
kill -9 $nodeproc
supervisorctl start selfjob-front:*
echo "============================== END OF RESTART NODE PROCESS ==============================" >> ./worker.log
